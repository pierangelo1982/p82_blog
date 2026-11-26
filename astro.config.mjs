// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkDisplayMath from './src/lib/remark-display-math.mjs';

// Font self-hosted (file di Fontsource) gestiti dall'API Fonts di Astro: genera @font-face,
// preload e font di riserva con metriche corrette. Con display "optional" il font arriva col preload
// e si usa subito; se la rete è lenta resta il font di sistema per quella pagina, senza scambi
// a metà lettura che spostano il testo (CLS). Dalla pagina successiva è in cache.
const LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
// Solo il sottoinsieme latin (basta per l'italiano): gli altri caratteri usano il font di riserva.
const serif = (style) => ({
	src: [`./node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-${style}.woff2`],
	weight: '200 900',
	style,
	unicodeRange: [LATIN],
});
const inter = {
	src: ['./node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'],
	weight: '100 900',
	style: 'normal',
	unicodeRange: [LATIN],
};

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.p82.it',
	trailingSlash: 'always',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Source Serif 4',
			cssVariable: '--font-serif',
			fallbacks: ['Iowan Old Style', 'Georgia', 'serif'],
			display: 'optional',
			options: {
				variants: [serif('normal'), serif('italic')],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Inter',
			cssVariable: '--font-sans',
			fallbacks: ['-apple-system', 'Segoe UI', 'system-ui'],
			display: 'optional',
			options: { variants: [inter] },
		},
	],
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
