/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/url-needed"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2017 } });
ruleTester.run("url-needed", rule, {

    valid: [
      {
        code: "var API_URL = 'http://dev.example.com/'",
      },
      {
        code: "var URL = 'file:///Users/emmanuel/github/'",
      },
      {
        code: "module.exports = { API_URL: undefined };",
      },
      {
        code: "API_URL = 'http://192.168.101.127/user/project.git'",
      },
      {
        code: "API_URL = 'http://localhost:80/'",
      },
      {
        code: "function a (API_URL) {}",
      },
      {
        code: "function multiply(a, b = 1) { return a * b; }",
      }
    ],

    invalid: [
        {
            code:  "var API_URL = 0",
            errors: [{
                message: "Look like to need an URL and it is not an URL",
            }]
        },
        {
            code:  "var API_URL = ''",
            errors: [{
                message: "Look like to need an URL and it is not an URL",
            }]
        },
        {
            code:  "function multiply(a, URL_API = 0) { return a * b; }",
            errors: [{
                message: "Look like to need an URL, avoid empty default value for URL",
            }]
        },
        {
            code: "const API_URL = ''",
            errors: [{
                message: "Look like to need an URL and it is not an URL",
            }]
        }
    ]
});
