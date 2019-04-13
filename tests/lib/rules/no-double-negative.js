/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

// arf, already exist : https://eslint.org/docs/rules/no-implicit-coercion

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-double-negative")
const { RuleTester } = require("eslint")

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-double-negative", rule, {
    valid: [
      {
        code: "!a",
      },
      {
        code: "~~a",
      },
      {
        code: "Boolean(a)",
      },
    ],

    invalid: [
        {
            code: "var b = function(a) { return !!a }",
            errors: [{
                message: "Double negative !!",
          }],
          output: "var b = function(a) { return Boolean(a) }"
        },
        {
            code: "! !a",
            errors: [{
                message: "Double negative !!",
          }],
          output: "Boolean(a)"
        },
        {
            code: "!!a",
            errors: [{
                message: "Double negative !!",
          }],
          output: "Boolean(a)"
        },
        {
            code: "!!window.test",
            errors: [{
                message: "Double negative !!",
          }],
          //output: "Boolean(window.test)"
        },
        {
            code: "!!(a+b)",
            errors: [{
                message: "Double negative !!",
          }],
          //output: "Boolean(a+b)"
        },
        {
            code: "!!a ? true: false",
            errors: [{
                message: "Double negative !!",
        }],
        output: "Boolean(a) ? true: false"
        },
    ]
});
