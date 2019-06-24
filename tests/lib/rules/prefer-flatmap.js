/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

const rule = require("../../../lib/rules/prefer-flatmap")
const RuleTester = require("eslint").RuleTester;

const valid = [
  {
    code: "[2, 3, 4].map(duplicate)",
  },
  {
    code: "[2, 3, 4]",
  },
  {
    code: "var arr = [2, 3, 4]; arr.map(function(item){ ; }).flat()",
  }, {
    code: "var arr = [2, 3, 4]; arr.map(duplicate).flat()",
  }, { // from https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-flat-map.md
    code: "[1, 2, 3].flatMap(i => [i])",
  }, /* {
    code: "[1, 2, 3].map(i => [i]).foo().flat()",
  }, */
]
const invalid = [
  {
    code: "[2, 3, 4].map(duplicate).flat()",
    output: "[2, 3, 4].flatMap(duplicate)",
    errors: [{
        message: 'slow',
        //type: ""
    }]
  }, {
    code: "[2, 3, 4].map(function(item){ ; }).flat()",
    output: "[2, 3, 4].flatMap(function(item){ ; })",
    errors: [{
        message: 'slow',
    }]
  },
]

var ruleTester = new RuleTester({parserOptions: { ecmaVersion: 2019 }});
ruleTester.run("prefer-flapmap", rule, { valid, invalid });

module.exports = {
  valid,
  invalid
}