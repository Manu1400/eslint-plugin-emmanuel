/**
 * @fileoverview eslint-plugin-import offer a rule to report when a resolved path is imported more than once, but that doesn't work with require
 * @author Emmanuel
 */

const rule = require('../../../lib/rules/no-duplicate-requires');
const RuleTester = require('eslint').RuleTester;

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
    },
    {
      code: "require('module/sub-module'); require('module/other-sub-module');"
    }
  ],

  invalid: [
    {
      code: "var a = require('module'); var b = require('module');",
      errors: [{
        message: 'duplicate require',
      }],
    },
    {
      code: "var a = require('module.js'); var b = require('module.js');",
      errors: [{
        message: 'duplicate require',
      }],
    },
    {
      code: "var a = require('./module'); var b = require('./module.js');",
      errors: [{
        message: 'duplicate require',
      }],
    },
    {
      code: "var a = require('./test'); var b = require('./test.json');",
      errors: [{
        message: 'duplicate require',
      }],
    },
    {
      code: "var a = require('./file'); var b = require('./file');",
      errors: [{
        message: 'duplicate require',
      }],
    },
    {
      code: "require('./file'); require('./file');",
      errors: [{
        message: 'duplicate require',
      }],
    },
    {
      code: "require('/tmp/test.json'); require('/tmp/test');",
      errors: [{
        message: 'duplicate require',
      }],
    },
    {
        code: "var bar = require('getName'); var foo = require(\"getName\")",
        errors: [{
            message: "duplicate require",
        }]
    },
    {
      code: "var a = require('.'); var b = require('.')",
      errors: [{
          message: "duplicate require",
      }]
    },
    {
      code: "var a = require('/tmp//test'); var b = require('/tmp/test')",
      errors: [{
          message: "duplicate require",
      }]
    },
    {
      code: "var m = require('module'); var sub = require('module/submodule');",
      errors: [{
          message: "duplicate require",
      }]
    }
    /*
    {
      code: "var a = require('module'), b = require('module')",
      errors: [{
          message: "duplicate require",
      }]
    }
    */
  ],
});
