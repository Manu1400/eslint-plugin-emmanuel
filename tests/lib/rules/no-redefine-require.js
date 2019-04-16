/**
 * @fileoverview Find require() or require(&#34;&#34;)
 * @author Emmanuel
 */
"use strict";

const rule = require("../../../lib/rules/no-redefine-require")
const RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("no-redefine-require", rule, {
    valid: [
      {
        code: "var a = require('module');",
      },
      {
        code: "var a = require('./file');",
      },
      {
        code: "var a = require('./file.js');",
      },
      {
        code: "var obj = require('./file.json');",
      },
      {
        code: "var fs = require(\"\");",
      },
      {
        code: "var fs = require();",
      }
    ],
    invalid: [
        {
            code: "var require = require(\"\");",
            errors: [{
                message: "require redefined",
                nodeType: 'VariableDeclarator',
            }]
        },
        {
            code: "var require = \"\"",
            errors: [{
                message: "require redefined",
                nodeType: 'VariableDeclarator',
            }]
        },
        {
          code: "var require;",
          errors: [{
              message: "require redefined",
              nodeType: 'VariableDeclarator',
          }]
        },
        {
          code: "const require = \"\"",
          parserOptions: { ecmaVersion: 2019 },
          errors: [{
              message: "require redefined",
              nodeType: 'VariableDeclarator',
          }]
        },
        /*
        {
          code: "var {require} = test;",
          parserOptions: { ecmaVersion: 2019 },
          errors: [{
              message: "require redefined",
              nodeType: 'VariableDeclarator',
          }]
        },
        {
          code: "const {require} = test;",
          parserOptions: { ecmaVersion: 2019 },
          errors: [{
              message: "require redefined",
              nodeType: 'VariableDeclarator',
          }]
        },
        */
    ]
});
