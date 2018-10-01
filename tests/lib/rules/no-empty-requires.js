/**
 * @fileoverview Find require() or require(&#34;&#34;)
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-empty-requires"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-empty-requires", rule, {

    valid: [
      {
        code: "var a = require('module');",
      },
      {
        code: "var a = require('./file');",
      },
      {
        code: "require('module');",
      },
      {
        code: "require('./file');",
      }
    ],

    invalid: [
        {
            code: "require(\"\");",
            errors: [{
                message: "Fill me in.",
            }]
        },
        {
            code: "require();",
            errors: [{
                message: "Fill me in.",
            }]
        }
    ]
});
