/**
 * @fileoverview eslint-plugin-import offer a rule to report when a resolved path is imported more than once, but that doesn't work with require
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-duplicate-requires"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-duplicate-requires", rule, {

    valid: [
      {
        code: "var a = require('module'); var b = require('other-module');"
      }
    ],

    invalid: [
        {
            code: "var a = require('module'); var b = require('module');",
            errors: [{
                message: "Fill me in."
            }]
        },
        {
            code: "var a = require('./file'); var b = require('./file');",
            errors: [{
                message: "Fill me in."
            }]
        },
    ]
});
