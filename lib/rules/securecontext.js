'use strict';

const create = context => {

	return {
		'CallExpression[callee.type=\'Identifier\'][callee.name=\'isSecureContext\']': node => {
      //if (env == browser) // transform this test
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
			//url: getDocsUrl(__filename)
			description: "check isSecureContext"
		}
	}
};
