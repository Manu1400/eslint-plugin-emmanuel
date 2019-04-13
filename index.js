'use strict';
const path = require('path');
const importModules = require('import-modules');

module.exports = {
	rules: importModules(path.resolve(__dirname, 'lib/rules'), {camelize: false}),
	configs: {
		recommended: {
			env: {
				es6: true
			},
			parserOptions: {
				ecmaVersion: 2017,
				sourceType: 'module'
			},
			plugins: [
				'emmanuel'
			],
			// TODO: update this recommended rule list 
			rules: {
        "emmanuel/no-useless-concat": "warn"
			}
		}
	}
};
