/**
 * @fileoverview eslint-plugin-import offer a rule to report when a resolved path is imported more than once, but that doesn't work with require
 * @author Emmanuel
 */


//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-duplicate-requires');


const RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-duplicate-requires', rule, {

  valid: [
    {
      code: "var a = require('module'); var b = require('other-module');",
    },
    {
      code: "var a = require('./file'); var b = require('./other-file');",
    },
    {
      code: "require",
    },
    {
      code: "var a = require('test'); var b = require('./test.json');",
    }
  ],

  invalid: [
    {
      code: "var a = require('module'); var b = require('module');",
      errors: [{
        message: 'Fill me in.',
      }],
    },
    {
      code: "var a = require('module.js'); var b = require('module.js');",
      errors: [{
        message: 'Fill me in.',
      }],
    },
    {
      code: "var a = require('./module'); var b = require('./module.js');",
      errors: [{
        message: 'Fill me in.',
      }],
    },
    {
      code: "var a = require('./test'); var b = require('./test.json');",
      errors: [{
        message: 'Fill me in.',
      }],
    },
    {
      code: "var a = require('./file'); var b = require('./file');",
      errors: [{
        message: 'Fill me in.',
      }],
    },
    {
      code: "require('./file'); require('./file');",
      errors: [{
        message: 'Fill me in.',
      }],
    }
  ],
});
