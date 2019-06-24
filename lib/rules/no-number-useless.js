'use strict';

const getDocsUrl = require('../util/getDocsUrl');

const enforceNew = new Set([
	'Array'
]);

const n = new Set([
	'Number',
  'parseInt'
]);

const create = context => {
	return {
		'CallExpression[callee.name]': node => {
			const {name} = node.callee;

      if (n.has(name) && node.arguments.length == 0) {
        context.report({
          node,
          message: `Number() -> (0)`,
          fix: function(fixer) {
            return fixer.replaceText(node, '(0)')
          }
        });
      }

			if (node.arguments.length != 1) {
				return;
			}

			if (enforceNew.has(name) && node.arguments[0].type === 'CallExpression') {
				if (node.arguments[0].callee.name !== 'Number') {
					return;
				}
				if (node.arguments[0].arguments[0].type === 'Literal') {
					const value = node.arguments[0].arguments[0].value
					context.report({
						node,
						message: `The value \`${value}\` is very useless`,
					});
				}
			}

      if (n.has(name)) {
        if (node.callee.type === 'Identifier' && node.callee.name === "Number") {
          if (typeof node.arguments[0].value == "number") {
            context.report({
              node,
              message: `The string Number() is useless`,
            });
          }
        }
      }
		}
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			url: getDocsUrl(__filename),
			description: "useless Number object constructor"
		},
		fixable: 'code'
	}
};
