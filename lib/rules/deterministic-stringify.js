'use strict';

const create = context => {
	const sourceCode = context.getSourceCode();

	return {
		/**
		 * @param {CallExpression } node
		 */
		"CallExpression[callee.object.name=\"JSON\"][callee.property.name='stringify'][arguments.0]": node => {
		const text = sourceCode.getText(node.arguments[0])
		
		if (text == "undefined") {
			return;
		}

		if (node.arguments.length > 1) {
			context.report({
				node,
				message: "too arguments in JSON.stringify()"
			});
			return;
		}

        context.report({
            node,
			message: "prefer fast-json-stable-stringify package",
			fix: function(fixer) {
				return fixer.replaceText(node, 'require("fast-json-stable-stringify")(' + text + ')')
			}
        });
    }
	};
};

/**
 * @type {Fixable}
 */
const fixable = 'code'

module.exports = {
	create,
	meta: {
		docs: {
			description: "prefer fast-json-stable-stringify package to native JSON.stringify()"
		},
		fixable
	}
};
