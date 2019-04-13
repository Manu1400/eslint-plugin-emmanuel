/**
 * @fileoverview use Math constants
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/math-shortcut"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("math-shortcut", rule, {

    valid: [
      {
        code: "Math.log(10)",
      },
      {
        code: "Math.log(2)",
      },
      {
        code: "Math.sqrt(.5)",
      },
      {
        code: "Math.exp(0)",
      },
      {
        code: "Math.eval('0')",
      },
    ],

    invalid: [
        {
            code: "Math.exp(1)",
            errors: [{
                message: "Math.exp(1) -> Math.E",
                type: "CallExpression"
            }]
        },
        {
            code: "math.eval('exp(1)')",
            errors: [{
                message: "math.eval('exp(1)') -> math.eval('e') -> Math.E",
                type: "CallExpression"
            }]
        },
    ]
});
