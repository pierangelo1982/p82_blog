/**
 * Tipi per <LineChart>: grafici di funzioni calcolati in fase di build.
 * Le stringhe "TeX" possono contenere formule tra `$…$`.
 */

/**
 * Colori (definiti in global.css, con variante scura):
 * - 1, 2, 3: serie categoriche, nell'ordine fisso della palette (max 3 per grafico);
 * - 'neutral': linea di riferimento grigia (es. una costante);
 * - 'o1' | 'o2' | 'o3': rampa ordinale blu, dal valore più piccolo al più grande.
 */
export type ChartColor = 1 | 2 | 3 | 'neutral' | 'o1' | 'o2' | 'o3';
export type ChartDash = 'solid' | 'dash' | 'dot' | 'dashdot';
/** Lato del punto su cui si appoggia il testo: 'n' = il testo sta sopra il punto, ecc. */
export type Place = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | 'c';

export interface ChartAxis {
	min: number;
	max: number;
	ticks: number[];
	/** Titolo dell'asse (TeX). */
	label: string;
	/** Decimali delle etichette dei tick. */
	tickDecimals?: number;
	/** Decimali dei valori nel tooltip e nella tabella. */
	decimals?: number;
	/** Unità mostrata nel tooltip e nella tabella, es. "km/h". */
	unit?: string;
	/** Prefisso del valore x nel tooltip, es. "c = ". */
	prefix?: string;
}

export interface ChartSeries {
	/** Nome nella legenda (TeX). */
	name: string;
	/** Nome in testo semplice, per tooltip, tabella e lettori di schermo. */
	plain: string;
	fn: (x: number) => number;
	color: ChartColor;
	dash?: ChartDash;
	/** Intervallo di x in cui la funzione è disegnata (default: tutto l'asse). */
	domain?: [number, number];
	/** Etichetta diretta sulla curva. */
	label?: { x: number; text?: string; place?: Place };
}

export interface ChartMark {
	x: number;
	y: number;
	hollow?: boolean;
	label?: string;
	place?: Place;
}

export interface ChartNote {
	x: number;
	y: number;
	/** TeX */
	text: string;
	place?: Place;
}

export interface ChartConfig {
	/** Titolo breve in testo semplice (per l'accessibilità). */
	title: string;
	/** Didascalia (TeX). */
	caption: string;
	x: ChartAxis;
	y: ChartAxis;
	series: ChartSeries[];
	/** Passo della griglia di x per tooltip e tastiera. */
	step: number;
	/** Valori di x per la tabella dei dati. */
	table: number[];
	marks?: ChartMark[];
	notes?: ChartNote[];
	/** Linee verticali di guida, da y0 a y1. */
	guides?: { x: number; y0: number; y1: number }[];
	/** Rapporto larghezza/altezza dell'area del grafico (default 16/10). */
	aspect?: number;
}
