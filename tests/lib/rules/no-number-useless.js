/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-number-useless"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-number-useless", rule, {

    valid: [
      {
        code: "Number(a)",
      }
    ],

    invalid: [
        {
            code: "Number(0)",
            errors: [{
                message: "The string Number() is useless",
            }]
        },
    ]
});
