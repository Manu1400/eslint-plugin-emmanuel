/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

const rule = require("../../../lib/rules/deterministic-stringify")
const RuleTester = require("eslint").RuleTester;

const valid = [
  {
    code: "JSON.stringify();",
  },
  {
    code: "JSON.stringify(undefined);",
  },
  {
    code: "var stringify = require('fast-json-stable-stringify'); \n var obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 }; stringify(obj);",
  },
  {
    code: "stringify(obj, function (a, b) { ; })",
  },
]
const invalid = [
  {
    code: "JSON.stringify(a, b);",
    output: "JSON.stringify(a, b);", // same output
    errors: [{
        message: 'too arguments in JSON.stringify()',
        type: "CallExpression"
    }]
  },
  {
    code: "JSON.stringify(obj);",
    output: "require(\"fast-json-stable-stringify package\")(obj);",
    errors: [{
      message: 'prefer fast-json-stable-stringify package',
      type: "CallExpression"
    }]
  },
  {
    code: "var str = JSON.stringify(obj);",
    output: "var str = require(\"fast-json-stable-stringify package\")(obj);",
    errors: [{
      message: 'prefer fast-json-stable-stringify package',
      type: "CallExpression"
    }]
  },
  {
    code: "JSON.stringify(new Date(2006, 0, 2, 15, 4, 5))",
    output: "require(\"fast-json-stable-stringify package\")(new Date(2006, 0, 2, 15, 4, 5))",
    errors: [{
      message: 'prefer fast-json-stable-stringify package',
      type: "CallExpression"
    }]
  },
]

var ruleTester = new RuleTester();
ruleTester.run("deterministic-stringify", rule, { valid, invalid });

// for doing statistics about tests
module.exports = {
  valid,
  invalid
}