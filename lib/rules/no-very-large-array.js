'use strict';

const enforceNew = new Set([
	'Array'
]);

const disallowNew = new Set([
	'Array'
]);

const create = context => {
	const firstOption = context.options[0] || {}
	const maxValue = firstOption.maxValue || 1000000000

	return {
		CallExpression: node => {
			const {name} = node.callee;

			if (node.arguments.length != 1) {
				return;
			}

			if (enforceNew.has(name) && node.arguments[0].type === 'ConditionalExpression') {
				const consequent = node.arguments[0].consequent.value
				const alternate  = node.arguments[0].alternate.value
				if (consequent > maxValue || alternate > maxValue) {
					const value = consequent > maxValue ? consequent : alternate
					context.report({
						node,
						message: `The value \`${value}\` look like too big in \`${name}()\`.`,
					});
				}
			}

			if (enforceNew.has(name) && node.arguments[0].type === 'CallExpression') {
				if (node.arguments[0].callee.name !== 'Number') {
					return;
				}
				if (node.arguments[0].arguments[0].type === 'Literal') {
					const value = node.arguments[0].arguments[0].value
					if (value > maxValue) {
						context.report({
							node,
							message: `The value \`${value}\` is too big \`Array(Number())\`.`,
						});
					}
				}
			}

			if (enforceNew.has(name) && node.arguments[0].type === 'Literal') {
				const value = node.arguments[0].value
				if (value > maxValue) {
					context.report({
						node,
						message: `The value \`${value}\` is too big in \`${name}()\`.`,
						//fix: fixer => fixer.insertTextBefore(node, 'new ')
					});
				}
			}
		},
		'NewExpression[callee.name][arguments][range]': node => {
			const {name} = node.callee;

			if (node.arguments.length != 1) {
				return;
			}

			if (disallowNew.has(name) && node.arguments[0].type === 'Literal') {
				const value = node.arguments[0].value
				if (value > maxValue) {
					context.report({
						node,
						message: `Use \`${value}()\` instead of \`new ${name}()\`.`,
						fix: fixer => fixer.removeRange([
							node.range[0],
							node.callee.range[0]
						])
					});
				}
			}
		}
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			//url: getDocsUrl(__filename)
			description: "no very large array"
		},
		fixable: 'code'
	}
};
