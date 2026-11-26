/**
 * Grafici dell'articolo "Andare più piano fa davvero consumare meno?".
 * Riproducono le figure del paper (FuelConsumption/paper/fuel_consumption.tex)
 * con gli stessi parametri: d = 100 km, c = 1 L/h, a = 0,03, b = 4·10⁻⁶.
 */
import type { ChartAxis, ChartConfig } from '../lib/chart';

const d = 100;
const c = 1;
const a = 0.03;
const b = 4e-6;

/** Consumo totale del modello combinato su d km. */
const total = (v: number) => d * (c / v + a + b * v ** 2);

const speed: ChartAxis = {
	min: 10,
	max: 130,
	ticks: [10, 30, 50, 70, 90, 110, 130],
	label: 'Velocità (km/h)',
	unit: 'km/h',
};

const speedTable = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130];

export const componenti: ChartConfig = {
	title: 'Scomposizione del consumo totale nel modello combinato',
	caption:
		'Il consumo totale su 100 km (blu) è la somma di tre parti: quella legata al tempo, che cala con la velocità, quella legata all’aria, che cresce, e quella legata alla distanza, costante. Il minimo cade dove le prime due si bilanciano. Parametri: $c = 1$ L/h, $a = 0{,}03$, $b = 4\\cdot10^{-6}$.',
	x: speed,
	y: { min: 0, max: 14, ticks: [0, 2, 4, 6, 8, 10, 12, 14], label: 'Consumo su 100 km (litri)', unit: 'L', decimals: 2 },
	step: 1,
	table: speedTable,
	series: [
		{
			name: 'totale $C(v)$',
			plain: 'Totale',
			fn: total,
			color: 1,
			label: { x: 122, text: 'totale', place: 'nw' },
		},
		{
			name: 'tempo $dc/v$',
			plain: 'Tempo',
			fn: (v) => (d * c) / v,
			color: 2,
			dash: 'dash',
			label: { x: 40, text: 'tempo', place: 'sw' },
		},
		{
			name: 'aria $dbv^2$',
			plain: 'Aria',
			fn: (v) => d * b * v ** 2,
			color: 3,
			dash: 'dashdot',
			label: { x: 118, text: 'aria', place: 'se' },
		},
		{
			name: 'distanza $da$',
			plain: 'Distanza',
			fn: () => d * a,
			color: 'neutral',
			dash: 'dot',
			label: { x: 124, text: 'distanza', place: 'sw' },
		},
	],
	guides: [{ x: 50, y0: 0, y1: 6 }],
	marks: [
		{ x: 50, y: 6, label: '$v_{ott} = 50$ km/h, 6 L', place: 'se' },
		{ x: 25, y: 7.25, hollow: true, label: '7,25 L', place: 'ne' },
		{ x: 100, y: 8, hollow: true, label: '8 L', place: 'nw' },
	],
};

export const modelli: ChartConfig = {
	title: 'Consumo totale su 100 km in tre modelli diversi',
	caption:
		'Tre modelli calibrati per passare tutti dallo stesso punto: 6 litri su 100 km a 50 km/h. Se il consumo orario cresce come $v$, la velocità non conta; se cresce come $v^3$, conviene sempre andare più piano. Solo il modello combinato ha una velocità ottimale. Parametri: $a = 0{,}06$; $b = 2{,}4\\cdot10^{-5}$; combinato come sopra.',
	x: speed,
	y: { min: 0, max: 18, ticks: [0, 3, 6, 9, 12, 15, 18], label: 'Consumo totale su 100 km (litri)', unit: 'L', decimals: 2 },
	step: 1,
	table: speedTable,
	series: [
		{
			name: 'combinato: $q = c + av + bv^3$',
			plain: 'Combinato',
			fn: total,
			color: 1,
			label: { x: 120, text: 'combinato', place: 'nw' },
		},
		{
			name: 'solo rotolamento: $q = av$',
			plain: 'Solo rotolamento',
			fn: () => 6,
			color: 2,
			dash: 'dash',
			label: { x: 126, text: 'rotolamento', place: 'sw' },
		},
		{
			name: 'solo aria: $q = bv^3$',
			plain: 'Solo aria',
			fn: (v) => d * 2.4e-5 * v ** 2,
			color: 3,
			dash: 'dashdot',
			label: { x: 74, text: 'aria', place: 'w' },
		},
	],
	marks: [{ x: 50, y: 6 }],
};

export const derivata: ChartConfig = {
	title: 'Derivata del consumo totale',
	caption:
		'La derivata del consumo totale, con gli stessi parametri, cambia segno una sola volta, a $v_{ott} = 50$ km/h. Sotto quella velocità accelerare fa risparmiare, sopra conviene rallentare.',
	x: { ...speed, min: 15, ticks: [15, 30, 50, 70, 90, 110, 130] },
	y: {
		min: -0.35,
		max: 0.12,
		ticks: [-0.3, -0.2, -0.1, 0, 0.1],
		tickDecimals: 1,
		label: '$C\'(v)$: litri in più per ogni km/h in più',
		decimals: 3,
		unit: 'L per km/h',
	},
	step: 1,
	aspect: 16 / 8,
	table: [20, 30, 40, 50, 60, 80, 100, 130],
	series: [
		{
			name: '$C\'(v)$',
			plain: 'Derivata C′(v)',
			fn: (v) => d * (-c / v ** 2 + 2 * b * v),
			color: 1,
			domain: [18, 130],
		},
	],
	marks: [{ x: 50, y: 0, label: '$v_{ott}$', place: 'nw' }],
	notes: [
		{ x: 32, y: 0.07, text: '$C\' < 0$: conviene accelerare' },
		{ x: 95, y: -0.2, text: '$C\' > 0$: conviene rallentare' },
	],
};

export const ottimo: ChartConfig = {
	title: 'Velocità ottimale al variare del consumo di base',
	caption:
		'Velocità ottimale $v_{ott} = \\sqrt[3]{c/(2b)}$ al variare del consumo di base $c$, per tre valori del coefficiente aerodinamico $b$. Il punto è l’esempio del testo. Un’auto più aerodinamica (con $b$ minore) ha l’ottimo a velocità più alte, ma la crescita è lenta: è una radice cubica.',
	x: {
		min: 0,
		max: 3,
		ticks: [0, 0.5, 1, 1.5, 2, 2.5, 3],
		tickDecimals: 1,
		label: 'Consumo di base $c$ (litri all’ora)',
		unit: 'L/h',
		prefix: 'c = ',
		decimals: 2,
	},
	y: { min: 0, max: 120, ticks: [0, 20, 40, 60, 80, 100, 120], label: 'Velocità ottimale (km/h)', unit: 'km/h', decimals: 1 },
	step: 0.05,
	table: [0.25, 0.5, 1, 1.5, 2, 2.5, 3],
	series: [
		{
			name: '$b = 2\\cdot10^{-6}$',
			plain: 'b = 2·10⁻⁶',
			fn: (x) => Math.cbrt(x / (2 * 2e-6)),
			color: 'o1',
			dash: 'dash',
			label: { x: 2.75, text: '$b = 2\\cdot10^{-6}$', place: 'nw' },
		},
		{
			name: '$b = 4\\cdot10^{-6}$',
			plain: 'b = 4·10⁻⁶',
			fn: (x) => Math.cbrt(x / (2 * 4e-6)),
			color: 'o2',
			label: { x: 2.75, text: '$4\\cdot10^{-6}$', place: 'nw' },
		},
		{
			name: '$b = 8\\cdot10^{-6}$',
			plain: 'b = 8·10⁻⁶',
			fn: (x) => Math.cbrt(x / (2 * 8e-6)),
			color: 'o3',
			dash: 'dashdot',
			label: { x: 2.75, text: '$8\\cdot10^{-6}$', place: 'se' },
		},
	],
	marks: [{ x: 1, y: 50 }],
};
