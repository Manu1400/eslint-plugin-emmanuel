'use strict';

/**
 * Transform a Regex object to a string
 * @returns {string}
 */
const getRegexStr = function({ pattern, flags }) {
    return `/${pattern}/${flags}`
}


/**
 * @param { Context } context
 */
const create = context => {
    //const sourceCode = context.getSourceCode();

	return {
	"BinaryExpression[operator][left.regex][right.regex]": node => {
        const { left, right, operator } = node

        if (["!=", "!==", "==", "==="].includes(operator) === false) {
            return;
        }        

        context.report({
            node,
			message: `regex comparaison return false, use fast-deep-equal package`,
			fix: function(fixer) {
                const leftStr = getRegexStr(left.regex)
                const rightStr = getRegexStr(right.regex)
                var str = `require('fast-deep-equal')(${leftStr}, ${rightStr})`
                if (["!=", "!=="].includes(operator)) {
                    str += " === false"
                }
				return fixer.replaceText(node, str)
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
			description: "use `fast-deep-equal` package to compare regex expressions"
		},
		fixable
	}
};
