'use strict';

const getDocsUrl = require('../util/getDocsUrl');

/**
 * @param { Context } context
 */
const create = context => {
	return {
    /**
     * @argument { Property } node
     */
    "ObjectExpression > Property[key]": node => {
        const scope = context.getScope()
        const keyName = node.key.value || node.key.name
        const raw = node.value.raw || node.value.name || ""
        
        if (raw === "true" || raw === "false" || raw === keyName)
            return;
        if (/(do|is|no|can)[A-Z].+/.test(keyName)) {
            const variablesFiltered = scope.variables.filter(function (variable) {
                return variable.name == raw
            })
            if (variablesFiltered.length && raw != "NaN" && raw != "Infinity") {
                return;
            }
            // avoid MemberExpression
            if (node.value.type == "Literal" || node.value.type == "Identifier") {
                context.report({
                    node,
                    message: `message ` + keyName,
                });
            }
        }
    },
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			description: "check type concordance on boolean properties values",
			url: getDocsUrl(__filename)
		}
	}
};
