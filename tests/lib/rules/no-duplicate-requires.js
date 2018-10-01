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
    },
    {
      code: "if (true) { var fs = require('fs'); }"
    },
    {
      code: "var bar = require(getName()); var foo = require(\"getName\")"
    },
    {
      code: "require('.')"
    },
    {
      code: "var async = require('async'), debug = require('diagnostics')('my-module')"
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
    },
    {
      code: "require('/tmp/test.json'); require('/tmp/test');",
      errors: [{
        message: 'Fill me in.',
      }],
    },
    {
        code: "var bar = require('getName'); var foo = require(\"getName\")",
        errors: [{
            message: "Fill me in.",
        }]
    },
    {
      code: "var a = require('.'); var b = require('.')",
      errors: [{
          message: "Fill me in.",
      }]
    },
    {
      code: "var a = require('/tmp//test'); var b = require('/tmp/test')",
      errors: [{
          message: "Fill me in.",
      }]
    },
    /*
    {
      code: "var a = require('module'), b = require('module')",
      errors: [{
          message: "Fill me in.",
      }]
    }
    */
  ],
});
