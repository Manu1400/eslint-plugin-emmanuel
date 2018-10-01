# eslint-plugin-emmanuel

My first ESLint plugin

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
