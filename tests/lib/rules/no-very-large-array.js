/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-very-large-array"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-very-large-array", rule, {

    valid: [
      {
        code: "Array(1)",
      },
      {
        code: "Array()",
      },
      {
        code: "Array(a)",
      }
    ],

    invalid: [
        {
            code:  "Array(10000000000)",
            errors: [{
                message: "The value `10000000000` is too big in `Array()`.",
                type: "CallExpression"
            }]
        },
    ]
});
