/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

const rule = require("../../../lib/rules/no-similar-fn-params")
const RuleTester = require("eslint").RuleTester

var ruleTester = new RuleTester();
ruleTester.run("no-similar-fn-params", rule, {

    valid: [
      {
        code: "function myFunction (isPublic, isMinor) {}",
      },
      {
        code: "function myFunction (myParam, otherParam=0, thirdParam=0) {}",
        parserOptions: { ecmaVersion: 2019 }
      }
    ],

    invalid: [
        {
            code: "function myFunction (aaaaaa, aaaaaab) {}",
            errors: [{
                message: "Avoid similar params names",
                type: "FunctionDeclaration"
            }]
        }, {
            code: "function myFunction (isPublicF, isPublicM) {}",
            errors: [{
                message: "Avoid similar params names",
                type: "FunctionDeclaration"
            }]
        }, {
            code: "function myFunction (myFirstArg, isPublicF, isPublicM) {}",
            errors: [{
                message: "Avoid similar params names",
                type: "FunctionDeclaration"
            }]
        }, {
            code: "function myFunction (isPublic, _isPublicF) {}",
            errors: [{
                message: "Avoid similar params names",
                type: "FunctionDeclaration"
            }]
        }, {
            code: "(function (aaa, aab){})",
            errors: [{
                message: "Avoid similar params names",
                type: "FunctionExpression"
            }]
        }, {
            code: "(function (aaa, aabb){})",
            options: [2],
            errors: [{
                message: "Avoid similar params names",
                type: "FunctionExpression"
            }]
        }, {
            code: "(function (aaa, aabb){})",
            options: [2, false],
            errors: [{
                message: "Avoid similar params names",
                type: "FunctionExpression"
            }]
        },  {
            code: "function myFunction (aaa, aab=0) {}",
            parserOptions: { ecmaVersion: 2019 },
            errors: [{
                message: "Avoid similar params names",
                type: "FunctionDeclaration"
            }]
          }, {
            code: "function myFunction (aaa, aab=0, ccc=0) {}",
            parserOptions: { ecmaVersion: 2019 },
            errors: [{
                message: "Avoid similar params names",
                type: "FunctionDeclaration"
            }]
          },
    ]
});
