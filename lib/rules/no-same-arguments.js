'use strict';

const getDocsUrl = require('../util/getDocsUrl');

const schema = [
    {
        type: "string",
        default: 'Math', // TODO: documentation the default value
    }, {
        type: "string",
        default: 'hypot',
    },
]

const create = context => {
	return {
        // detect `Math.hypot(dx, dx);`
        "ExpressionStatement CallExpression[callee.object.name]": node => {
            // TODO: detect a.b.c(x, x)` as option, in rule no-same-arguments
            const objectName = context.options[0] || schema[0].default
            const propertyName = context.options[1] || schema[1].default

            const [firstArg, secondArg] = node.arguments
            if (firstArg === undefined || secondArg === undefined) {
                return;
            }
            const message = `same param on ${objectName}.${propertyName}, maybe a typing mistake`
            if (node.callee.object.name == objectName) {
                if (node.callee.property.name == propertyName) {
                    if (firstArg.name == secondArg.name) {
                        context.report({
                            node,
                            message,
                        });
                    }
                }
            }
        },
	};
};

module.exports = {
	create,
	meta: {
		docs: {
            description: "avoid arguments mistake, like same string arguments in a function call",
            url: getDocsUrl(__filename),
            recommended: false, // need options
        },
        schema
	}
};
