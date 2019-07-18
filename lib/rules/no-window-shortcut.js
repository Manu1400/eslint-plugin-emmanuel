'use strict';

const getDocsUrl = require('../util/getDocsUrl');

// TODO: define this an option, in new rule `no-window-shortcut`
const chromeNames = ["print", "caches", "chrome", "screen", "keys"]

const create = context => {
	return {
		'Identifier[name]': node => {
            const name = node.name
            if (chromeNames.includes(name) === false) {
                return;
            }

            const prefix = name === "keys" ? "Object." : "window."

            const parent = node.parent
            if (parent.type === "MemberExpression") {
                if (chromeNames.includes(parent.object.name)) {
                    context.report({
                        node,
                        message: "prefer `" + prefix + parent.object.name + "`",
                        fix: function(fixer) {
                            return fixer.replaceText(node, prefix + parent.object.name)
                        }
                    })
                }
            } else if (parent.type === "CallExpression") {
                context.report({
                    node,
                    message: "prefer `" + prefix + name + "`",
                    fix: function(fixer) {
                        return fixer.replaceText(node, prefix + name)
                    }
                })
            }
        }
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
			url: getDocsUrl(__filename),
			description: "add `window` prefix"
		},
		fixable
	}
};
