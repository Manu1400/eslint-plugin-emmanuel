'use strict';

const getDocsUrl = require('../util/getDocsUrl');

/* eslint-disable no-warning-comments */

// const { create } = require("eslint/lib/rules/no-implicit-coercion")
// TODO: use https://eslint.org/docs/rules/no-implicit-coercion#allow

//const obj = {
//    "boolean": false,
//    "number": false,
//    "string": false,
//    "allow": ["!!", "~", "+", "*"] // allow all
//}

/**
 * @param { Context } context
 */
const create = context => {
    // !! is not an operator
	return {
		'UnaryExpression[operator="!"] > UnaryExpression[operator="!"]': node => {
            const { name } = node.argument
            context.report({
                node,
                message: "Double negative !!",
                fix: function(fixer) {
                    if (typeof name == "string")
                        return fixer.replaceText(node.parent, 'Boolean(' + name + ')')
                }
            });
		},
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
			url: getDocsUrl(__filename),
            description: "No double negative",
        },
        fixable
	}
};