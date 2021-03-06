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
      },
      {
        code: "document.evaluate(\"//some/xpath/statement[@coolness = very]\", document)",
      },
      {
        code: "document.evaluate(\"//title[@lang = \'en\']\", document)",
      },
      {
        code: "document.evaluate(\"//title[@lang = \'en-GB\']\", document)",
      },
      {
        code: "document.evaluate(\"//*[@lang = \'en-GB\']\", document)",
      },
      // from https://www.w3schools.com/xml/xpath_syntax.asp
      {
        code: "document.evaluate(\"//title[@lang]\", document)",
      },
      // XPath utility function, function isn't part of JavaScript itself, it is just a utility that's available in the console
      {
        code: "$x('//html', document)",
      },
      {
        code: "window.document.evaluate(\"//html\", document)",
      },
      // Selects all elements in the document
      {
        code: "document.evaluate(\"//*\", document)",
      },
      {
        code: "document.evaluate(\"//* | //book/price\", document)",
      },
      {
        code: "document.evaluate(\"//book | //book/title\", document)",
      },
      {
        code: "document.evaluate(\"/html/body[0] | /html[0]\", document)",
      },
      // var str = "//test";\ndocument.evaluate(str, body);
      {
        code: "var t = ''; \n document.evaluate(t, body);"
      },
    ],

    invalid: [
        // simplify
        {
          code: "document.evaluate(\"//book | //book\", document)",
          errors: [{
            message: "same expression",
            type: "CallExpression"
        }]
        },
        {
          code: "document.evaluate(\"//book/title | //book/title\", document)",
          errors: [{
            message: "same expression",
        }]
        },
        // https://www.w3schools.com/xml/xpath_syntax.asp
        {
          code: "document.evaluate(\"/html/body[0]\", document)",
          errors: [{
              message: "invalid index: 0",
          }]
        },
        // @lang
        {
          code: "document.evaluate(\"//title[@lang = 'invalid-lang:']\", document)",
          errors: [{
              message: "invalid @lang: invalid-lang:",
          }]
        },
        {
          code: "document.evaluate(\"//title/book[@lang = 'invalid-lang:']\", document)",
          errors: [{
              message: "invalid @lang: invalid-lang:",
          }]
        },
        {
          code: "document.evaluate(\"//\", document)",
          errors: [{
              message: "invalid XPath: Unrecognized text",
          }]
        },
        {
          code: "document.evaluate(\"\", document)",
          errors: [{
              message: "invalid XPath: Unrecognized text",
          }]
        },
        {
          code: "document.evaluate(\"//book[]\", document)",
          errors: [{
              message: "invalid XPath: Unrecognized text",
          }]
        },
        // no error in Chrome but not a valid XPath expression:
        {
          code: "document.evaluate(\"/html[callee.object.name]\", document)",
          errors: [{
            message: "invalid XPath",
        }]
        },
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
          },
          {
            message: 'XPath expression: duplicate predicate',
          }]
      },
    ]
});
