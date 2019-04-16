/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

const rule = require("../../../lib/rules/no-special-number")
const RuleTester = require("eslint").RuleTester

var ruleTester = new RuleTester();
ruleTester.run("no-special-number", rule, {

    valid: [
      {
        code: "var a = 1000",
      }
    ],

    invalid: [
        {
            code: "2.220446049250313e-16",
            errors: [{
                message: "Number.EPSILON detected",
                type: "Literal"
            }]
        },
        {
            code: "-2.220446049250313e-16",
            errors: [{
                message: "Number.EPSILON detected",
                type: "Literal"
            }]
        },
        {
            code: "2.718281828459045",
            errors: [{
                message: "Math.E detected",
                type: "Literal"
            }]
        },
        {
            code: "3.141592653589793",
            errors: [{
                message: "Math.PI detected",
                type: "Literal"
            }]
        },
        {
            code: "1.5707963267948966",
            errors: [{
                message: "(Math.PI/2) detected",
                type: "Literal"
            }]
        },
        {
            code: "1.5574077246549023",
            errors: [{
                message: "Math.tan(1) detected",
                type: "Literal"
            }]
        }
    ]
});
