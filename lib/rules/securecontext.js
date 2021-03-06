'use strict';

const getDocsUrl = require('../util/getDocsUrl');

const create = context => {

	return {
		'CallExpression[callee.type=\'Identifier\'][callee.name=\'isSecureContext\']': node => {
      //if (env == browser) // transform this test
      context.report({
				node,
				message: `isSecureContext is a boolean value, not a function`
			});
		},
		'CallExpression[callee.type=\'MemberExpression\'][callee.object.name=\'window\'][callee.property.name=\'isSecureContext\']': node => {
			context.report({
					  node,
					  message: `isSecureContext is a boolean value, not a function`
				  });

		}
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			url: getDocsUrl(__filename),
			description: "check isSecureContext"
		}
	}
};
