var rule = require("../../../lib/rules/simplify-regex")

const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester()
ruleTester.run('reject', rule, {
  valid: [
    {code: 'var simple = /ab/;'},
    {code: 'var simple = /adjc/;'},
    {code: 'var simple = /[ad]/;'},
    {code: 'var simple = /[`a]/;'},
    {code: 'var simple = /[z{]/;'},
    {code: 'var simple = /[a][b]/;'},
    {code: 'var simple = /[a]+[b]/;'},
  ],

  invalid: [
    {
      code: `var simple = /[abc]/;`,
      errors: [{
        message: 'message',
      }],
      output: 'var simple = /[a-c]/ ;',
    },
    {
      code: `var simple = /[abc]{1,2}/;`,
      errors: [{
        message: 'message',
      }],
      output: 'var simple = /[a-c]{1,2}/ ;',
    },
    {
      code: `var simple = /[^abc]/;`,
      errors: [{
        message: 'message',
      }],
      output: 'var simple = /[^a-c]/ ;',
    },
    {
      code: `var simple = /[^abc]+/;`,
      errors: [{
        message: 'message',
      }],
      output: 'var simple = /[^a-c]+/ ;',
    },
    {
      code: `var simple = /[cba]/;`,
      errors: [{
        message: 'message',
      }],
    },
    {
      code: `var simple = /[a]/;`,
      errors: 0,
    },
    {
      code: 'return /[abcde]/;',
      errors: 1,
    },
  ],
})
