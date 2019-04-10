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
      },
      // https://developer.mozilla.org/fr/docs/Web/XPath/Fonctions
      {
        code: "document.evaluate(\"//article[count(author) = 1]/title\", document, null, XPathResult.ANY_TYPE, null)",
      },
      {
        code: "document.evaluate(\"count(//div)\", document)",
      }
    ],

    invalid: [
        {
            code:  "document.evaluate(\"/html/body//h2:llL ms%dl\", document)",
            errors: [{
                message: "invalid XPath: Unrecognized text",
            }]
        },
        {
            code: "document.evaluate(\"//article[count(author)=1]/title\", document)",
            errors: [{
                message: 'XPath expression lisibility: //article[count(author) = 1]/title',
            }]
        },
        {
          code: "document.evaluate(\"/html\", document, null, 8, null)",
          errors: [{
              message: "avoid magic number: {{valueToReplace}} 0 -> XPathResult.ANY_TYPE",
          }]
        },
        {
          code: "document.evaluate(\"//article[count(author) = 1][count(author) = 1][count(author) = 1][count(author) = 1][count(author) = 1][count(author) = 1][count(author) = 1][count(author) = 1][count(author) = 1][count(author) = 1][count(author) = 1][count(author) = 1][count(author) = 1][count(author) = 1][count(author) = 1]/title\", document)",
          errors: [{
              message: 'large XPath expression detected',
          }]
      },
    ]
});
