/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("eslint/lib/rules/no-restricted-syntax"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const rules = require("../../../.eslintrc.json").rules
const options = rules["no-restricted-syntax"] // or [str, ...options]

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2017 } });
ruleTester.run("no-restricted-syntax", rule, {

    valid: [
      {
        code: "1 < 2 < 3",
        options
      },
      {
        code: "RegExp(a, b, c)",
        options
      },
      {
        code: "Boolean(a)",
        options
      },
      // TODO: remplace by code history.back();
      {
        code: "history.go(-1)",
        options
      },
      {
        code: "var a = 1, b = 2",
        options
      },
      {
        code: "a ? a : a",
        options
      },
      {
        code: "_.isEqual",
        options
      },
      // https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore/issues/177
      // remplace by require('lodash.isequal')(a, b) [and run npm i lodash.isequal --save]
      {
        code: "_.isEqual(a, b)",
        options
      },
    ],

    invalid: [
        // SequenceExpression
        {
            code: "function n(a,b){return b.abbr=a,P[a]||(P[a]=new d),P[a].set(b),P[a]}",
            options,
            errors: [{
                message: "The comma operator is confusing and a common mistake",
            }]
        },
        {
            code: "function s(a,b){return b=t(b,a.lang()),jb[b]||(jb[b]=r(b)),jb[b](a)}            ",
            options,
            errors: [{}, {}, {}]
        },
        {
            code: "var a = 1;var b = 2;a,b",
            options,
            errors: [{
                message: "The comma operator is confusing and a common mistake",
            }]
        },
        {
            code: "P,/**/\nl",
            options,
            errors: [{
                message: "The comma operator is confusing and a common mistake",
            }]
        },
        // other cases:
        {
            code: "new Boolean(a)",
            options,
            errors: [{
                message: "don't use new before Boolean constructor, see https://wtfjs.com/wtfs/2015-02-02-Boolean-constructor",
            }]
        },
        {
            code: "new RegExp(a, b, c)",
            options,
            errors: [{
                message: "Using 'RegExp' is not allowed with > two args",
            }]
        },
        {
            code: "x instanceof y",
            options,
            errors: [{
                message: 'Using the operator `instanceof` is not allowed, see https://github.com/eslint/eslint/issues/11132',
            }]
        }, {
            code: "a instanceof Array",
            options,
            errors: [{
                message: "Using the operator `instanceof` is not allowed, see https://github.com/eslint/eslint/issues/11132",
            },/* {
                message: "`instanceof Array` is disallowed. Prefer `Array.isArray()`."
            }*/]
        }, {
            code: "3 > 2 > 1",
            options,
            errors: [{
                message: 'see https://github.com/denysdovhan/wtfjs#comparison-of-three-numbers',
            }]
        }, {
            code: "c > b > a",
            options,
            errors: [{
                message: 'see https://github.com/denysdovhan/wtfjs#comparison-of-three-numbers',
            }]
        }, {
            code: "arr.length--",
            options,
            errors: [{
                message: "avoid `arr.length--`, see http://eamodeorubio.github.io/thejshorrorshow/#/44",
            }]
        }, {
            code: "$x('')",
            options,
            errors: [{
                message: '$x function is only available on browser console',
            }]
        }, {
            code: "function fn() {};",
            options,
            errors: [{
                message: 'use a more specific function name',
            }]
        }, {
            code: "[] == ![];",
            options,
            errors: [{
                message: 'see https://github.com/denysdovhan/wtfjs#-is-equal-',
            }]
        }, {
            code: "NaN === NaN;",
            options,
            errors: [{
                message: "don't compare to NaN, see https://github.com/denysdovhan/wtfjs#nan-is-not-a-nan",
            }, {
                message: "don't compare to NaN, see https://github.com/denysdovhan/wtfjs#nan-is-not-a-nan",
            }]
        }, {
            code: "1234567890123458",
            options,
            errors: [{
                message: "todo: a finir aussi https://github.com/eslint/eslint/issues/11279",
            }]
        },
    ]
});
