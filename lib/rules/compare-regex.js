'use strict';

/**
 * 
 * @returns {string}
 */
const getRegexStr = function({ pattern, flags }) {
    return `/${pattern}/${flags}`
}

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

module.exports = {
	create,
	meta: {
		docs: {
			description: "use `fast-deep-equal` package to compare regex expressions"
		},
		fixable: 'code'
	}
};
