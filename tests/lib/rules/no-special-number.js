/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-special-number"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-special-number", rule, {

    valid: [
      {
        code: "var a = 1000",
      }
    ],

    invalid: [
        {
            code:  "2.220446049250313e-16",
            errors: [{
                message: "Number.EPSILON detected",
            }]
        },
        {
            code:  "-2.220446049250313e-16",
            errors: [{
                message: "Number.EPSILON detected",
            }]
        },
        {
            code:  "1.5574077246549023",
            errors: [{
                message: "(Math.tan(1)) detected",
            }]
        },
        {
            code:  "2.718281828459045",
            errors: [{
                message: "Math.E detected",
            }]
        }
    ]
});
