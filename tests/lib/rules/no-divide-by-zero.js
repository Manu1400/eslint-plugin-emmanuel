/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-divide-by-zero"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-divide-by-zero", rule, {

    valid: [
      {
        code: "var a = 0 / 1",
      },
      {
        code: "var a = 0.0 / 10",
      },
      {
        code: "var a = 1 / 1",
      },
      {
        code: "var a = Math.random(); var b = 1 / a",
      }
    ],

    invalid: [
        {
            code: "0 / 0",
            errors: [{
                message: "Divide by zero",
            }]
        },
        {
            code: "1 / 0",
            errors: [{
                message: "Divide by zero",
            }]
        },
        {
            code: "1 / 0.0",
            errors: [{
                message: "Divide by zero",
            }]
        },
        {
          code: "1 / ZERO",
          errors: [{
              message: "maybe a divide by -zero, please rename variable ZERO",
          }]
        },
        {
          code: "1 / +0",
          errors: [{
              message: "Divide by +zero",
          }]
        },
        {
          code: "1 / -0",
          errors: [{
              message: "Divide by -zero",
          }]
        },
        {
          code: "1 / (a=0)",
          errors: [{
              message: "Look like divide by zero",
          }]
        },
        {
          code: "1 / (0+0)",
          errors: [{
              message: "look like to divide by result 0 (0+0)",
          }]
        },
        {
          code: "1 / (1-1)",
          errors: [{
              message: "look like to divide by result 0 (samevalue - samevalue)",
          }]
        },
        {
          code: "1 / (a-a)",
          errors: [{
              message: "useless code (variable-same_variable)",
          }]
        },
    ]
});
