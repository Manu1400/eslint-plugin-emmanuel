'use strict';

module.exports = {
	rules: {
		'avoid-class-name-conflict': require('./lib/rules/avoid-class-name-conflict'),
		'avoid-infinite-loop': require('./lib/rules/avoid-infinite-loop'),
		'avoid-typing-mistake': require('./lib/rules/avoid-typing-mistake'),
		'bool-concordance': require('./lib/rules/bool-concordance'),
		'compare-regex': require('./lib/rules/compare-regex'),
		'deterministic-stringify': require('./lib/rules/deterministic-stringify'),
		'math-shortcut': require('./lib/rules/math-shortcut'),
		'max-lines-per-loop': require('./lib/rules/max-lines-per-loop'),
		'negative-array': require('./lib/rules/negative-array'),
		'no-commented-out-code': require('./lib/rules/no-commented-out-code'),
		'no-divide-by-zero': require('./lib/rules/no-divide-by-zero'),
		'no-double-negative': require('./lib/rules/no-double-negative'),
		'no-duplicate-requires': require('./lib/rules/no-duplicate-requires'),
		'no-empty-requires': require('./lib/rules/no-empty-requires'),
		'no-invalid-xpath': require('./lib/rules/no-invalid-xpath'),
		'no-nan': require('./lib/rules/no-nan'),
		'no-number-useless': require('./lib/rules/no-number-useless'),
		'no-redefine-require': require('./lib/rules/no-redefine-require'),
		'no-reuse-function-name': require('./lib/rules/no-reuse-function-name'),
		'no-same-arguments': require('./lib/rules/no-same-arguments'),
		'no-similar-fn-params': require('./lib/rules/no-similar-fn-params'),
		'no-special-number': require('./lib/rules/no-special-number'),
		'no-useless-concat': require('./lib/rules/no-useless-concat'),
		'no-very-large-array': require('./lib/rules/no-very-large-array'),
		'prefer-array-fill': require('./lib/rules/prefer-array-fill'),
		'prefer-flatmap': require('./lib/rules/prefer-flatmap'),
		'securecontext': require('./lib/rules/securecontext'),
		'simplify-regex': require('./lib/rules/simplify-regex'),
		'too-many-comments': require('./lib/rules/too-many-comments'),
		'ts-type': require('./lib/rules/ts-type'),
		'url-needed': require('./lib/rules/url-needed')
	},
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
