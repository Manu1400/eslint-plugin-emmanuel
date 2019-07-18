'use strict';

// ie: https://eslint.org/docs/rules/max-lines-per-function

const MAX_LINES = 10

/**
 * @type {Schema}
 */
const schema = [
	{
		"type": "number",
		"minimum": 1,
		"multipleOf" : 1,
		"default": MAX_LINES
	}
]

const getMaxLines = (maxLines = MAX_LINES) => { return maxLines }

const run = (node, context, operator="") => {
	const sourceCode = context.getSourceCode()
	const lines = sourceCode.lines
	const nbLines = lines.length
	const MAX_LINES = getMaxLines(context.options[0])

	//const str = sourceCode.getText(node)

	if (nbLines > MAX_LINES) {
		context.report({
			node,
			message: `too many lines in ${operator}`
		})
	}
}

const create = context => {
	return {
		"ForStatement > BlockStatement": (node) => {
			run(node, context, `for`)
		},
		"WhileStatement > BlockStatement": (node) => {
			run(node, context, `while`)
		},
		"DoWhileStatement > BlockStatement": (node) => {
			run(node, context, `do while`)
		}, 
	}
};

module.exports = {
	create,
	meta: {
		docs: {
			description: "Max lines per a loop"
		},
		schema
	}
};
