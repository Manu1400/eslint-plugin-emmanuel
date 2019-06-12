'use strict';

const create = context => {
	return {
    "CallExpression[callee.property.name='flat'] > MemberExpression > CallExpression > MemberExpression[property.name='map'] > ArrayExpression": node => {
        const rootElement = node.parent.parent.parent.parent
        context.report({
            node: rootElement,
            // source: https://v8.dev/features/array-flat-flatmap
            message: `slow`,
            fix: function(fixer) {
                const sourceCode = context.getSourceCode();
                const str = sourceCode.getText(node.parent.parent).replace('map', 'flatMap')

                return fixer.replaceText(rootElement, str)
            }
        });
    },
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			description: "slow code, prefer `flatMap` method"
			//url: getDocsUrl(__filename)
		},
		fixable: 'code'
	}
};
