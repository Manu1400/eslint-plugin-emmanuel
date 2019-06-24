'use strict';

const getDocsUrl = require('../util/getDocsUrl');

const create = context => {
	return {
		"MemberExpression[object.type='ArrayExpression'][property.type='UnaryExpression'][property.operator='-'][property.argument.value>=1]": (node) => {
            //const elements = node.object.elements
            //console.warn(node) 
            context.report({
                node,
                message: `negative array`
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

module.exports = {
	create,
	meta: {
		docs: {
            description: "avoid negative index on an array",
            url: getDocsUrl(__filename)
		},
		schema: []
	}
};
