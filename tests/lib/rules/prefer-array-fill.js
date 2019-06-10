/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

var rule = require("../../../lib/rules/prefer-array-fill"),

    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("prefer-array-fill", rule, {

    valid: [
      {
        code: "Array(1)",
      },
      {
        code: "Array()",
      },
      {
        code: "Array(a)",
      },
      {
        code: "Array(5, 50, 3)",
      },
      {
        code: "[5, 50, 3]",
      },
      {
        code: "[]",
      },
      {
        code: "var arr = [5, 50, 3]",
      },
      {
        code: "[500]",
      },
      {
        code:  "[/regex/g, /regex/gi, /regex/g]",
      },
      {
        code:  "[Symbol('foo'), Symbol('foo'), Symbol('foo')]",
      },
      // Array(5).fill(Math.random()) DONT give X random numbers
      {
        code:  "[Math.random(), Math.random(), Math.random()]",
      },
      {
        code:  "var random = Math.random; [random(), random(), random()]",
      },
      {
        code: "var a = 0; [a++, a++, a++]", // [0, 1, 2]
      },
      {
        code:  "['42n', 42n, '42n']",
        parser: "babel-eslint",
        parserOptions: { ecmaVersion: 2019 },
      },
      {
        code:  "[42n, 42n, '42n']",
        parser: "babel-eslint",
        parserOptions: { ecmaVersion: 2019 },
      },
      {
        code:  "[{a:0}, {a:0}, {a:0}]",
      },
    ],

    invalid: [
        {
            code:  "['', '', '', '', '']",
            output: "Array(5).fill('')",
            errors: [{
                message: "prefer Array.fill method",
                type: "ArrayExpression"
            }]
        },
        {
          code:  "['A', 'A', 'A', 'A', 'A']",
          output: "Array(5).fill('A')",
          errors: [{
              message: "prefer Array.fill method",
              type: "ArrayExpression"
          }]
        },
        // robot emoji
        {
          code:  "['🤖', '🤖', '🤖', '🤖', '🤖', '🤖', '🤖', '🤖', '🤖', '🤖']",
          output: "Array(10).fill('🤖')",
          errors: [{
              message: "prefer Array.fill method",
              type: "ArrayExpression"
          }]
        },
        {
          code:  "['🤖', '🤖', '🤖', '🤖', '🤖']",
          output: "Array(5).fill('🤖')",
          errors: [{
              message: "prefer Array.fill method",
              type: "ArrayExpression"
          }]
        },
        {
          code:  "['🤖0l', '🤖0l', '🤖0l', '🤖0l', '🤖0l']",
          output: "Array(5).fill('🤖0l')",
          errors: [{
              message: "prefer Array.fill method",
              type: "ArrayExpression"
          }]
        },
        {
          code:  "[1, 1, 1]",
          output: "Array(3).fill(1)",
          errors: [{
              message: "prefer Array.fill method",
              type: "ArrayExpression"
          }]
        },
        {
          code:  "[1.5, 1.5, 1.5]",
          output: "Array(3).fill(1.5)",
          errors: [{
              message: "prefer Array.fill method",
              type: "ArrayExpression"
          }]
        },
        {
          code:  "[1.0, 1, 1.000]",
          output: "Array(3).fill(1)",
          errors: [{
              message: "prefer Array.fill method",
              type: "ArrayExpression"
          }]
        },
        // 
        {
          code:  "[0.0000000000000000000000005, 5e-25, 0.0000000000000000000000005]",
          output: "Array(3).fill(5e-25)",
          errors: [{
              message: "prefer Array.fill method",
              type: "ArrayExpression"
          }]
        },
        {
            code:  "var array = ['', '', '', '', '']",
            output: "var array = Array(5).fill('')",
            errors: [{
                message: "prefer Array.fill method",
                type: "ArrayExpression"
            }]
        },
        {
            code:  "var arr = [5, 5, 5]",
            output: "var arr = Array(3).fill(5)",
            errors: [{
                message: "prefer Array.fill method",
                type: "ArrayExpression"
            }]
        },
        {
          code:  "[/regex/, /regex/, /regex/]",
          output: "Array(3).fill(/regex/)",
          errors: [{
              message: "prefer Array.fill method",
              type: "ArrayExpression"
          }]
        },
        {
          code:  "[true, true, true]",
          output: "Array(3).fill(true)",
          errors: [{
              message: "prefer Array.fill method",
              type: "ArrayExpression"
          }]
        },
        {
          code:  "[42n, 42n, 42n]",
          output: "Array(3).fill(42n)",
          parser: "babel-eslint",
          parserOptions: { ecmaVersion: 2019 },
          errors: [{
            message: "prefer Array.fill method",
            type: "ArrayExpression"
          }]
        },
        // 9007199254740992n
        {
          code:  "[9007199254740992n, 9007199254740992n, 9007199254740992n]",
          output: "Array(3).fill(9007199254740992n)",
          parser: "babel-eslint",
          parserOptions: { ecmaVersion: 2019 },
          errors: [{
            message: "prefer Array.fill method",
            type: "ArrayExpression"
          }]
        },
        // string
        {
          code:  "['42n', '42n', '42n']",
          output: "Array(3).fill('42n')",
          errors: [{
            message: "prefer Array.fill method",
            type: "ArrayExpression"
          }]
        },
        // other case
        {
          code:  "[{}, {}, {}]",
          output: "Array(3).fill({})",
          errors: [{
            message: "prefer Array.fill method",
            type: "ArrayExpression"
          }]
        },
        {
          code:  "[NaN, NaN, NaN]",
          output: "Array(3).fill(NaN)",
          errors: [{
            message: "prefer Array.fill method",
            type: "ArrayExpression"
          }]
        },
        {
          code:  "[Infinity, Infinity, Infinity]",
          output: "Array(3).fill(Infinity)",
          errors: [{
            message: "prefer Array.fill method",
            type: "ArrayExpression"
          }]
        },
        {
          code:  "[-Infinity, -Infinity, -Infinity]",
          output: "Array(3).fill(-Infinity)",
          errors: [{
            message: "prefer Array.fill method",
            type: "ArrayExpression"
          }]
        },
        {
          code: "[a, a, a]",
          output: "Array(3).fill(a)",
          parserOptions: { range: false },
          errors: [{
            message: "prefer Array.fill method",
            type: "ArrayExpression"
          }]
        },
        {
          code: "var a = 0; [a, a, a]",
          output: "var a = 0; Array(3).fill(a)",
          errors: [{
            message: "prefer Array.fill method",
            type: "ArrayExpression"
          }]
        },
        {
          code: "Array(5, 5, 5, 5, 5, 5, 5)",
          output: 'Array(7).fill(5)',
          errors: [{
            message: "prefer Array.fill method",
            type: "CallExpression"
          }]
        },
    ]
});
