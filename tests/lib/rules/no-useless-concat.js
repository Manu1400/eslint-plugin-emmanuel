/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

const rule = require("../../../lib/rules/no-useless-concat")
const RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("no-useless-concat", rule, {

    valid: [
      {
        code: "var a = \"\"",
      },
      {
        code: "var a = \"\", b = \"string\"",
      },
      {
        code: "var a = b ? \"\" : \"\"",
      },
      {
        code: "var a = \"-\" + \"+\"[0]",
      },
      //WARNING: var a = `str` + `other`[0] -> var a = `str${c}`; in https://eslint.org/demo/
      //{
      //  code: "var a = `str` + `other`[0]",
      //},
      {
        code: "var a = (\"-\")",
      }
    ],

    invalid: [
        {
            code:  "var a = \"\" + \"\"",
            errors: [{
                message: 'Unexpected string concatenation of literals.',
            }]
        },
        {
            code:  "var a = \"-\" + \"+\"",
            errors: [{
                message: 'Unexpected string concatenation of literals.',
            }]
        },
    ]
});
