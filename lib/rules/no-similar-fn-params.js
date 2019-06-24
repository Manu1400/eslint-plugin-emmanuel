'use strict';

const getDocsUrl = require('../util/getDocsUrl');

const levenshtein = require('js-levenshtein')
const sortByDistance = require('s-sortbydistance')

const create = context => {
    const apply = node => {
        const maxDistance = context.options[0] || 1
        const removeUnderscore = context.options[1] || true

        const params = node.params.map((param) => {
            const name = param.type == 'AssignmentPattern' ? param.left.name : param.name
            
            if (removeUnderscore && name.charAt(0) === '_') {
                return name.substr(1)
            }
            return name
        })

        var isHavingSimilarParams = false

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
		"FunctionDeclaration[params.0.name][params.1]": node => {
            apply(node)
        },
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
        schema: [
            {
                "type": "number",
                "minimum": 0,
                "multipleOf" : 1
            }, {
                "type": "boolean"
            }
        ]
	}
};
