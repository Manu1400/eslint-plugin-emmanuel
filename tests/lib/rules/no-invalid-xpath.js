/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-invalid-xpath"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-invalid-xpath", rule, {

    valid: [
      {
        code: "document.evaluate(\"/html/body//h2\", document, null, XPathResult.ANY_TYPE, null)",
      },
      {
        code: "document.evaluate(\"/html\", document, null, XPathResult.ANY_TYPE, null)",
      }
    ],

    invalid: [
        {
            code:  "document.evaluate(\"/html/body//h2:llL ms%dl\", document, null, XPathResult.ANY_TYPE, null)",
            errors: [{
                message: "invalid XPath: ",
            }]
        },
        {
            code: "document.evaluate(\"/html\", document, null, 8, null)",
            errors: [{
                message: "avoid magic number: {{valueToReplace}} 0 -> XPathResult.ANY_TYPE",
            }]
        }
    ]
});
