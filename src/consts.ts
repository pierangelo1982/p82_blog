// Dati globali del sito, importabili da qualsiasi componente.

export const SITE_TITLE = 'p82';
export const SITE_DESCRIPTION = 'Appunti su libri, storia e programmazione.';
export const SITE_AUTHOR = 'Pierangelo Orizio';
export const SITE_LANG = 'it';

export const SOCIAL_LINKS = [
	{ label: 'Mastodon', href: 'https://mastodon.social/@pierangelo1982', rel: 'me' },
	{ label: 'GitHub', href: 'https://github.com/pierangelo1982' },
	{ label: 'X', href: 'https://x.com/pierangelo1982' },
];

// Google Tag Manager (Google Analytics 4 è configurato dentro il container).
// Viene caricato solo dopo il consenso dato nel banner cookie (vedi CookieBanner.astro).
export const GTM_ID = 'GTM-WPJT7C6B';

// Indirizzo per le richieste privacy (GDPR), mostrato in privacy e cookie policy.
// TODO: inserire un indirizzo email di contatto.
export const PRIVACY_EMAIL = '';

// Data dell'ultima modifica di privacy e cookie policy.
export const POLICY_UPDATED = new Date('2026-11-26');
