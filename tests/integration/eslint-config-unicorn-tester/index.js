'use strict';

module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
  //env: {
  //  es6: true
  //},
	plugins: [
		'emmanuel'
	],
	extends: 'plugin:emmanuel/recommended',
  rules: {
    "emmanuel/math-shortcut": "warn",
    "emmanuel/no-divide-by-zero": "warn",
    "emmanuel/no-double-negative": "warn",
    "emmanuel/no-duplicate-requires": "warn",
    "emmanuel/no-empty-requires": "warn",
    "emmanuel/no-invalid-xpath": "warn",
    "emmanuel/no-nan": "warn",
    "emmanuel/no-number-useless": "warn",
    "emmanuel/no-redefine-require": "warn",
    "emmanuel/no-special-number": "warn",
    "emmanuel/no-useless-concat": "warn",
    "emmanuel/no-very-large-array": ["warn", {"maxValue": 10}],
    "emmanuel/securecontext": "warn",
    "emmanuel/simplify-regex": "warn",
    "emmanuel/prefer-array-fill": "warn",
    "emmanuel/no-similar-fn-params": ["warn", 2],
  }
};
