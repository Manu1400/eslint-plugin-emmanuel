/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-nan"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2017 } });
ruleTester.run("no-nan", rule, {

    valid: [
      {
        code: "",
      },
    ],

    invalid: [
        {
            code:  "NaN = function (value) {}",
            errors: [{
                message: 'Don\'t try to assign value to NaN',
            }]
        },
        {
            code:  "history.length = 0",
            errors: [{
                message: `Don't try to assign value to history.length`,
            }]
        },
        {
            code:  "locationbar.visible = true",
            errors: [{
                message: `Don't try to assign value to locationbar.visible`,
            }]
        },
        {
            code:  "window.length = 0",
            errors: [{
                message: `Don't try to assign value to window.length`,
            }]
        },
        {
            code:  "var closed = 0",
            errors: [{
                message: `Tips: avoid variable or constant named 'closed' because it's already used in browsers`,
            }]
        },
        {
            code:  "const closed = 0",
            errors: [{
                message: `Tips: avoid variable or constant named 'closed' because it's already used in browsers`,
            }]
        }
    ]
});
