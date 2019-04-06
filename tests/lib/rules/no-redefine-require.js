/**
 * @fileoverview Find require() or require(&#34;&#34;)
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-redefine-require"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-redefine-require", rule, {

    valid: [
      {
        code: "var a = require('module');",
      },
      {
        code: "var a = require('./file');",
      }
    ],

    invalid: [
        {
            code: "var fs = require(\"fs\");",
            errors: [{
                message: "Fill me in.",
            }]
        }
    ]
});
