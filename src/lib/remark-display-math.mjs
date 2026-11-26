/**
 * Plugin remark (da usare dopo remark-math).
 *
 * Con remark-math, `$$x$$` scritto su una sola riga è una formula *nel testo*:
 * viene resa piccola e allineata a sinistra. Diventa una formula a blocco
 * solo se i `$$` stanno su righe separate.
 *
 * Questo plugin trasforma in formula a blocco (centrata, a grandezza piena)
 * ogni paragrafo che contiene soltanto una formula scritta con `$$…$$`,
 * così entrambe le scritture danno lo stesso risultato.
 */
export default function remarkDisplayMath() {
	return (tree, file) => {
		const source = String(file.value ?? '');

		/** @param {any} parent */
		const walk = (parent) => {
			if (!Array.isArray(parent.children)) return;
			parent.children = parent.children.map((node) => {
				if (isDisplayMathParagraph(node, source)) return toMathBlock(node.children[0].value, node.position);
				walk(node);
				return node;
			});
		};

		walk(tree);
	};
}

/** @param {any} node @param {string} source */
function isDisplayMathParagraph(node, source) {
	if (node.type !== 'paragraph' || node.children?.length !== 1) return false;
	const [math] = node.children;
	if (math.type !== 'inlineMath') return false;
	const start = math.position?.start?.offset;
	const end = math.position?.end?.offset;
	if (start === undefined || end === undefined) return false;
	const raw = source.slice(start, end);
	return raw.startsWith('$$') && raw.endsWith('$$');
}

/** Nodo `math` identico a quello che crea mdast-util-math per un blocco `$$`. */
function toMathBlock(value, position) {
	return {
		type: 'math',
		meta: null,
		value,
		position,
		data: {
			hName: 'pre',
			hChildren: [
				{
					type: 'element',
					tagName: 'code',
					properties: { className: ['language-math', 'math-display'] },
					children: [{ type: 'text', value }],
				},
			],
		},
	};
}
