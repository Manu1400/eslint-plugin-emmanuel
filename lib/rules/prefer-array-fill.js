'use strict';

const getDocsUrl = require('../util/getDocsUrl');
const justCompare = require("just-compare")

// https://devinduct.com/blogpost/26/8-useful-javascript-tricks

const create = context => {

    const isSimilar = function (elements) {
        return elements.every(item =>
            item.value == elements[0].value || item.raw == elements[0].raw
        )
    }

    const isEqual = function (elements) {
        const copy = elements.map(item => {
            return {
                ...item,
                start: undefined,
                end: undefined,
                loc: undefined,
                parent: undefined,
                range: undefined,
                argument: {
                    ...item.argument,
                    start: undefined,
                    end: undefined,
                    loc: undefined,
                    parent: undefined,
                    range: undefined,
                }
            }
        })

        return copy.every(item => {
            return justCompare(item, copy[0])
        })
    }

    const run = function (elements, node) {
        const { value, raw } = elements[0]
        if (isEqual(elements) && elements.length != 1 && elements[0].type !== "UpdateExpression"){
            context.report({
                node,
                message: `prefer Array.fill method`,
                fix: function(fixer) {
                    const sourceCode = context.getSourceCode()
                    const str = sourceCode.getText(elements[0])
                	return fixer.replaceText(node, `Array(${elements.length}).fill(${str})`)
                }
            });
        } else if (isSimilar(elements) && elements.length != 1 && value != undefined) {
            const length = elements.length
            context.report({
                node,
                message: `prefer Array.fill method`,
                fix: function(fixer) {
                    var str = typeof value === 'string' ? `'${value}'` : value
                	return fixer.replaceText(node, `Array(${length}).fill(${str})`)
                }
            });
        }
    }

	return {
        "ArrayExpression[elements.0]": node => {
            const elements = node.elements
            run(elements, node)
        },
        "CallExpression[callee.name='Array'][arguments.0]": node => {
            const elements = node.arguments
            run(node.arguments, node)
        }
	};
};

module.exports = {
	create,
	meta: {
		docs: {
            description: "prefer Array.fill method to avoid mistake",
            url: getDocsUrl(__filename)
		},
		fixable: 'code'
	}
};
