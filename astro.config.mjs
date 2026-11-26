// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkDisplayMath from './src/lib/remark-display-math.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.p82.it',
	trailingSlash: 'always',
	integrations: [mdx(), sitemap()],
	markdown: {
		// Formule LaTeX negli articoli: $nel testo$ e $$a blocco$$ (anche su una riga), rese con KaTeX
		remarkPlugins: [remarkMath, remarkDisplayMath],
		rehypePlugins: [rehypeKatex],
		// Evidenziazione del codice con tema chiaro e scuro (vedi global.css)
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark-dimmed' },
		},
	},
});
