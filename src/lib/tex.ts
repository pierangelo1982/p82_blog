import katex from 'katex';

const escapeHtml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Testo con formule inline: le parti tra `$…$` vengono rese con KaTeX in fase di build,
 * il resto viene solo escapato. Restituisce HTML da usare con `set:html`.
 * Con `mathml: false` omette la copia MathML (per testi con aria-hidden).
 */
export function tex(text: string, { mathml = true } = {}): string {
	return text
		.split(/(\$[^$]+\$)/g)
		.map((part) =>
			part.length > 2 && part.startsWith('$') && part.endsWith('$')
				? katex.renderToString(part.slice(1, -1), {
						throwOnError: false,
						// senza MathML per i testi nascosti ai lettori di schermo (più leggero)
						output: mathml ? 'htmlAndMathml' : 'html',
					})
				: escapeHtml(part),
		)
		.join('');
}
