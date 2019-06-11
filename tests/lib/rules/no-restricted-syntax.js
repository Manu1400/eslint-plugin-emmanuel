/* eslint-disable no-restricted-syntax */
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

const {rules} = require("../../../.eslintrc.json")
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
      {
        code: "const a = require; require;",
        options
      },
      {
        code: "1234567890.123458",
        options
      },
      {
        code: "log(arr)",
        options
      },
      {
        code: "var s = []; console.log(s);",
        options
      },
      // https://devinduct.com/blogpost/22/javascript-clean-code-best-practices
      {
        code: "function notifyUser(emailAddress) {}",
        options
      },
      // TODO: need a new Eslint rule for Avoid negative conditionals
      // https://devinduct.com/blogpost/22/javascript-clean-code-best-practices
      // good
      {
        code: "function isUserBlocked(user) {}",
        options
      },
      // bad
      {
        code: "var theProduct;", // -> name
        options
      },
      {
        code: "var nameValue;", // -> product
        options
      },
      {
        code: "var iconUrl = resourcePath + 'images/marker-flag-end-shadowed.png'",
        options
      },
    ],

    invalid: [
        {
            code: "$x()",
            options,
            errors: [{
                message: "$x function is only available on browser console",
            }]
        },
        {
            code: "$$(\"a\")",
            options,
            errors: [{
                message: "$$ function is only available on browser console, prefer document.querySelectorAll()",
            }]
        },
        // for asap librairy: https://www.npmjs.com/package/asap
        {
            code: "asap(function (b) { ; });",
            options,
            errors: [{
                message: "don't use parameter(s), use an anonymous function with `asap` librairy",
            }]
        },
        {
            code: "var a = `azerty`, b = `querty`",
            options,
            errors: [{
                message: 'for tests, prefer real data, see faker.js to generate massive amounts of fake data in the browser and node.js',
            }, {
                message: 'for tests, prefer real data, see faker.js to generate massive amounts of fake data in the browser and node.js',
            }]
        },
        {
            code: "var a = `azerty`;",
            options,
            errors: [{
                message: 'for tests, prefer real data, see faker.js to generate massive amounts of fake data in the browser and node.js',
            }]
        },
        {
            code: "var a = 'azerty'",
            options,
            errors: [{
                message: 'for tests, prefer real data, see faker.js to generate massive amounts of fake data in the browser and node.js',
            }]
        },
        {
            code: "var a = 'querty'",
            options,
            errors: [{
                message: 'for tests, prefer real data, see faker.js to generate massive amounts of fake data in the browser and node.js',
            }]
        },
        {
            code: "var arr = []; console.log(arr);",
            options,
            errors: [{
                message: 'prefer `console.table(arr)` for debug an array',
            }]
        },
        // console log of an array: identifier with plurial
        {
            code: "var cars = []; console.log(cars);",
            options,
            errors: [{
                message: 'prefer `console.table()` for debug an array',
            }]
        },
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
                type: "BinaryExpression"
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
                type: "UpdateExpression"
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
                type: "FunctionDeclaration"
            }]
        }, {
            code: "[] == ![];",
            options,
            errors: [{
                message: 'see https://github.com/denysdovhan/wtfjs#-is-equal-',
                type: "UnaryExpression"
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
            // eslint-disable-next-line no-restricted-syntax
            code: "1234567890123458",
            options,
            errors: [{
                message: ">1234567890123456 https://github.com/eslint/eslint/issues/11279",
            }]
        }, {
            // https://devinduct.com/blogpost/22/javascript-clean-code-best-practices
            code: "function notif(user) {}",
            options,
            errors: [{
                message: 'Use long and descriptive names',
                type: "FunctionDeclaration"
            }]
        }, {
            // https://devinduct.com/blogpost/22/javascript-clean-code-best-practices
            code: "function createFile(name, isPublic) {}",
            options,
            errors: [{
                message: 'isPublic', //TODO: change message
                type: "FunctionDeclaration"
            }]
        }, {
            // https://devinduct.com/blogpost/22/javascript-clean-code-best-practices
            code: "function isUserNotBlocked(user) {}",
            options,
            errors: [{
                message: 'Avoid negative conditionals',
                type: "FunctionDeclaration"
            }]
        }, {
            code: "function isDOMNodeNotPresent(user) {}",
            options,
            errors: [{
                message: 'Avoid negative conditionals',
                type: "FunctionDeclaration"
            }]
        }, {
            // https://github.com/ryanmcdermott/clean-code-javascript#dont-add-unneeded-context
            code: "function paintCar(car) { car.carColor = 'Red'; }",
            options,
            errors: [{
                message: "Don't add unneeded context. Don't repeat you in your variable name",
                type: "MemberExpression"
            }]
        }, {
            // https://github.com/ryanmcdermott/clean-code-javascript#function-names-should-say-what-they-do
            code: "function addToDate(date, month) {}",
            options,
            errors: [{
                message: "Function names should say what they do",
                type: "FunctionDeclaration"
            }]
        }, {
            // https://americanexpress.io/clean-code-dirty-code/
            code: "const done = current >= goal",
            options,
            errors: [{
                message: "Boolean variables, or functions that return a boolean value, should start with “is,” “has” or “should.”",
                type: "VariableDeclarator"
            }]
        }, {
            code: "let done = current >= goal",
            options,
            errors: [{
                message: "Boolean variables, or functions that return a boolean value, should start with “is,” “has” or “should.”",
                type: "VariableDeclarator"
            }]
        }, {
            code: "const loadConfigFromServer = () => {}",
            options,
            errors: [{
                message: "don’t expose details of the implementation in the name",
                type: "VariableDeclarator"
            }]
        }, /* {
            // prefer-destructuring Eslint rule give a warning but don t autofix this case
            code: "const language = locale.split('-')[0];",
            options,
            errors: [{
                message: "Use array destructuring",
            }]
        }, */ {
            // prefer-destructuring Eslint rule give a warning but don t autofix this case
            code: "locale.split('-')[0];",
            options,
            errors: [{
                message: "Use array destructuring",
            }]
        }, {
            code: "var date = new Date()",
            options,
            errors: [{
                message: "Use a descriptive name for date",
            }]
        }, {
            // https://code.tutsplus.com/tutorials/24-javascript-best-practices-for-beginners--net-5399#14
            code: "var arr = new Array(); arr[0] = 'Joe'",
            options,
            errors: [{
                message: "Use [] Instead of New Array()",
            }]
        }, {
            // https://www.w3schools.com/js/js_best_practices.asp
            // /()/ instead of new RegExp()
            // TODO: autofix
            code: "new RegExp()",
            options,
            errors: [{
                message: "/()/ instead of new RegExp()",
            }]
        }, {
            code: "var iconUrl = resourcePath + 'images/marker-flag-end-shadowed.pngAA'",
            options,
            errors: [{
                message: "iconURL value: icon gif|jpeg|jpg|png|svg not detetected in URL construction",
            }]
        }, {
            code: "var iconURL = 'https://example.com/icon.pngdkk'",
            options,
            errors: [{
                message: "iconURL value: icon gif|jpeg|jpg|png|svg not detetected in URL",
            }]
        },
    ]
});
