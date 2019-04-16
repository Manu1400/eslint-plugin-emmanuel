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
      },
      {
        code: "require",
      },
      {
        code: "var bar = require(getName())"
      },
      {
        code: "var foo = require('foo' + VERSION); var bar = require('foo')"
      }
    ],

    invalid: [
        {
            code: "require(\"\");",
            errors: [{
                message: "empty require",
                type: "CallExpression"
            }]
        },
        {
            code: "require();",
            errors: [{
                message: "empty require",
                type: "CallExpression"
            }]
        },
        {
            code: "var a = require();",
            errors: [{
                message: "empty require",
                type: "CallExpression"
            }]
        }
    ]
});
