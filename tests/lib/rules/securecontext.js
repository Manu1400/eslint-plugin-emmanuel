/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/securecontext"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("securecontext", rule, {

    valid: [
      {
        code: "isSecureContext",
      },
      {
        code: "window.isSecureContext",
      },
      {
        code: "obj.isSecureContext()",
      },
    ],

    invalid: [
        {
            code:  "isSecureContext()",
            errors: [{
                message: `isSecureContext is a boolean value, not a function`,
            }]
        },
        {
            code:  "window.isSecureContext()",
            errors: [{
                message: `isSecureContext is a boolean value, not a function`,
            }]
        },
    ]
});
