import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Tutti gli articoli, dal più recente. */
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('blog');
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Testo semplice ricavato dal Markdown, per estratti e conteggio parole. */
function plainText(markdown = ''): string {
	return markdown
		.replace(/^---[\s\S]*?---/, '') // frontmatter residuo
		.replace(/```[\s\S]*?```/g, ' ') // blocchi di codice
		.replace(/^(import|export) .*$/gm, ' ') // righe MDX
		.replace(/<[^>]+>/g, ' ') // tag HTML/JSX
		.replace(/!\[[^\]]*]\([^)]*\)/g, ' ') // immagini
		.replace(/\[([^\]]*)]\([^)]*\)/g, '$1') // link -> testo
		.replace(/^#{1,6}\s+.*$/gm, ' ') // titoli
		.replace(/^\s*>\s?/gm, '') // citazioni
		.replace(/[*_`~]+/g, '') // enfasi e codice inline
		.replace(/\s+/g, ' ')
		.trim();
}

/** Minuti di lettura stimati (220 parole al minuto). */
export function readingTime(post: Post): number {
	const words = plainText(post.body).split(' ').filter(Boolean).length;
	return Math.max(1, Math.round(words / 220));
}

/** La descrizione dell'articolo, oppure un estratto dell'inizio del testo. */
export function summary(post: Post, max = 180): string {
	if (post.data.description) return post.data.description;
	const text = plainText(post.body);
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.–—-]+$/, '') + '…';
}

/** Articoli raggruppati per anno, dal più recente. */
export function groupByYear(posts: Post[]): [number, Post[]][] {
	const groups = new Map<number, Post[]>();
	for (const post of posts) {
		const year = post.data.pubDate.getFullYear();
		groups.set(year, [...(groups.get(year) ?? []), post]);
	}
	return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}
