'use strict';

const getDocsUrl = require('../util/getDocsUrl');

const create = context => {
    const sourceCode = context.getSourceCode();

	return {
		"MemberExpression[object.type='ArrayExpression'][property.type='UnaryExpression'][property.operator='-'][property.argument.value>=1]": (node) => {
            const sourceIndex = sourceCode.getText(node.property)
            const sourceArr = sourceCode.getText(node.object)

            context.report({
                node,
                message: `use package negative-array to having negative array index support`,
                fix: function(fixer) {
                    return fixer.replaceText(node, `negativeArray(${sourceArr})[${sourceIndex}]`)
                }
            })
        },
        // ts
        /*
        "FunctionDeclaration[params.length>=1][params.0.typeAnnotation]": (node) => {
            const [firstParam] = node.params
            console.warn(firstParam.typeAnnotation)
            // https://github.com/slavo3dev/front_end_masters/blob/c13ea86b31bea4cd763c037aff4f7ad101779e01/ast/other/old-demos/04_eslint-demo.js
            //const variables = context.getDeclaredVariables(node)
            if (true) {
                context.report({
                    node,
                    message: `negative`
                })
            }
        },
        */
	}
};

/**
 * @type {Fixable}
 */
const fixable = 'code'

module.exports = {
	create,
	meta: {
		docs: {
            description: "avoid negative index on an array",
            url: getDocsUrl(__filename)
        },
        fixable,
		schema: []
	}
};
