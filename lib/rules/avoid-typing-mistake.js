'use strict';

const levenshtein = require('js-levenshtein')

/**
 * @type {Schema}
 */
const schema = [
    {
        type: "number",
        minimum: 0,
        multipleOf : 1,
        default: 1,
    }, {
        type: "string",
        default: "constructor"
    }
]

/**
 * @param { Context } context
 */
const create = context => {
	return {
        // rule from case describe in https://twitter.com/floopily/status/1091298460895199237
        "ClassDeclaration MethodDefinition[key.name]": node => {
            const maxDistance = context.options[0] || schema[0].default
            const keyName = context.options[1] || schema[1].default

            const methodName = node.key.name
            const distance = levenshtein(methodName, keyName)

            const isSimilar = distance > 0 && distance <= maxDistance
            const isCaseIssue = methodName != keyName && methodName.toLowerCase() == keyName.toLowerCase()
            if (isSimilar || isCaseIssue) {
                context.report({
                    node,
                    message: `mistake on constuctor`,
                });
            }
        },
        // detect `constructor(hauteur, Hauteur)`
        "ClassDeclaration MethodDefinition[kind='constructor']": node => { // key.name='constructor'
            const maxDistance = context.options[0] || 1 //TODO: put this value as default

            const [firstParam, secondParam] = node.value.params
            if (firstParam === undefined || secondParam === undefined) {
                return;
            }
            //console.log(node.value.params); // .name
            const distance = levenshtein(firstParam.name, secondParam.name)
            if (distance > 0 && distance <= maxDistance) {
                context.report({
                    node,
                    message: `mistake on params constuctor`,
                });
            }
        }
	};
};

module.exports = {
	create,
	meta: {
		docs: {
            description: "avoid typing mistake",
            //recommended: true,
        },
        schema
	}
};
