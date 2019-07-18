'use strict';

const getDocsUrl = require('../util/getDocsUrl');

const levenshtein = require('js-levenshtein')
/**
 * @type {function}
 * @param {Array} arr strings to sort
 * @param {String} str sort against this
 * @param {Number} max remove items >= max
 * @return {Array} sorted by distance to str
 */
const sortByDistance = require('s-sortbydistance')

/**
 * @type {Schema}
 */
const schema = [
    {
        "type": "number",
        "minimum": 0,
        "multipleOf" : 1
    }, {
        "type": "boolean"
    }
]

/**
 * @param { Context } context
 */
const create = context => {
    // function not pure: context
    /**
     * @param {FunctionDeclaration | FunctionExpression} node
     */
    const apply = node => {
        /**
         * @type {number}
         */
        const maxDistance = context.options[0] || 1
        /**
         * @type {boolean}
         */
        const removeUnderscore = context.options[1] || true

        /**
         * @param {AssignmentPattern | any} param
         */
        const params = node.params.map((param) => {
            /**
             * @type {string}
             */
            const name = param.type == 'AssignmentPattern' ? param.left.name : param.name
            
            if (removeUnderscore && name.charAt(0) === '_') {
                return name.substr(1)
            }
            return name
        })

        let isHavingSimilarParams = false

        params.map(function (param) {
            const [, similar] = sortByDistance(params, param)

            const distance = levenshtein(param, similar)
            if (distance <= maxDistance) {
                isHavingSimilarParams = true
            }
        })

        if (isHavingSimilarParams) {
            context.report({
                node: node, // node.params[0] is more specific
                message: `Avoid similar params names`,
            });
        }
    }

	return {
        /**
         * @param {FunctionDeclaration} node
         */
		"FunctionDeclaration[params.0.name][params.1]": node => {
            apply(node)
        },
        /**
         * @param {FunctionExpression} node
         */
        "FunctionExpression[params.0.name][params.1]": node => {
            apply(node)
        }
	};
};

module.exports = {
	create,
	meta: {
		docs: {
            description: "Avoid similar params names",
            recommended: true,
			url: getDocsUrl(__filename)
        },
        schema
	}
};
