# eslint-plugin-emmanuel [![Build Status](https://travis-ci.org/Manu1400/eslint-plugin-emmanuel.svg?branch=master)](https://travis-ci.org/Manu1400/eslint-plugin-emmanuel)


My ESLint plugin

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-emmanuel`:

```
$ npm install eslint-plugin-emmanuel --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-emmanuel` globally.

## Usage

Add `emmanuel` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "emmanuel"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "emmanuel/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here

## When Not To Use It

If you want to use the <a href="http://requirejs.org/docs/api.html#cjsmodule">Simplified CommonJS Wrapper</a> format for your modules, you should not use this rule.


<!-- begin rule list -->

**Key**: :heavy_check_mark: = recommended, :wrench: = fixable

<!-- prettier-ignore -->
| Name | Description | :heavy_check_mark: | :wrench: |
| ---- | ----------- | ------------------ | -------- |
| [`emmanuel/avoid-class-name-conflict`](./docs/rules/avoid-class-name-conflict.md) | avoid use a native name for a class name |  |  |
| [`emmanuel/avoid-infinite-loop`](./docs/rules/avoid-infinite-loop.md) | disallow easy infinite loop | :heavy_check_mark: |  |
| [`emmanuel/avoid-typing-mistake`](./docs/rules/avoid-typing-mistake.md) | avoid typing mistake |  |  |
| [`emmanuel/bool-concordance`](./docs/rules/bool-concordance.md) | check type concordance on boolean properties values |  |  |
| [`emmanuel/compare-regex`](./docs/rules/compare-regex.md) | use `fast-deep-equal` package to compare regex expressions |  | :wrench: |
| [`emmanuel/deterministic-stringify`](./docs/rules/deterministic-stringify.md) | prefer fast-json-stable-stringify package to native JSON.stringify() |  | :wrench: |
| [`emmanuel/math-shortcut`](./docs/rules/math-shortcut.md) | use Math constants |  | :wrench: |
| [`emmanuel/max-lines-per-loop`](./docs/rules/max-lines-per-loop.md) | Max lines per a loop |  |  |
| [`emmanuel/negative-array`](./docs/rules/negative-array.md) | avoid negative index on an array |  |  |
| [`emmanuel/no-commented-out-code`](./docs/rules/no-commented-out-code.md) | Detect commented code |  |  |
| [`emmanuel/no-divide-by-zero`](./docs/rules/no-divide-by-zero.md) | No divide by zero |  |  |
| [`emmanuel/no-double-negative`](./docs/rules/no-double-negative.md) | No double negative |  | :wrench: |
| [`emmanuel/no-duplicate-requires`](./docs/rules/no-duplicate-requires.md) | eslint-plugin-import offer a rule to report when a resolved path is imported more than once, but that doesn't work with require |  |  |
| [`emmanuel/no-empty-requires`](./docs/rules/no-empty-requires.md) | Find require() or require("") | :heavy_check_mark: |  |
| [`emmanuel/no-invalid-xpath`](./docs/rules/no-invalid-xpath.md) | Check XPath expressions and avoid magic number |  | :wrench: |
| [`emmanuel/no-nan`](./docs/rules/no-nan.md) | Don't try to assign value to readonly items |  | :wrench: |
| [`emmanuel/no-number-useless`](./docs/rules/no-number-useless.md) | useless Number object constructor |  | :wrench: |
| [`emmanuel/no-redefine-require`](./docs/rules/no-redefine-require.md) | Detect if require() is redefine | :heavy_check_mark: |  |
| [`emmanuel/no-reuse-function-name`](./docs/rules/no-reuse-function-name.md) | No reuse function name |  | :wrench: |
| [`emmanuel/no-same-arguments`](./docs/rules/no-same-arguments.md) | avoid arguments mistake, like same string arguments in a function call |  |  |
| [`emmanuel/no-similar-fn-params`](./docs/rules/no-similar-fn-params.md) | Avoid similar params names | :heavy_check_mark: |  |
| [`emmanuel/no-special-number`](./docs/rules/no-special-number.md) | prefer to use a standart Math constant |  | :wrench: |
| [`emmanuel/no-useless-concat`](./docs/rules/no-useless-concat.md) | disallow unnecessary concatenation of literals or template literals | :heavy_check_mark: | :wrench: |
| [`emmanuel/no-very-large-array`](./docs/rules/no-very-large-array.md) | no very large array |  | :wrench: |
| [`emmanuel/prefer-array-fill`](./docs/rules/prefer-array-fill.md) | prefer Array.fill method to avoid mistake |  | :wrench: |
| [`emmanuel/prefer-flatmap`](./docs/rules/prefer-flatmap.md) | slow code, prefer `flatMap` method | :heavy_check_mark: | :wrench: |
| [`emmanuel/securecontext`](./docs/rules/securecontext.md) | check isSecureContext |  |  |
| [`emmanuel/simplify-regex`](./docs/rules/simplify-regex.md) | simplify regex |  | :wrench: |
| [`emmanuel/too-many-comments`](./docs/rules/too-many-comments.md) | .. |  |  |
| [`emmanuel/ts-type`](./docs/rules/ts-type.md) | .. |  | :wrench: |
| [`emmanuel/url-needed`](./docs/rules/url-needed.md) | .. |  | :wrench: |

<!-- end rule list -->
