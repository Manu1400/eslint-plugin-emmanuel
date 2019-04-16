var rule = require("../../../lib/rules/simplify-regex")

const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester()
ruleTester.run('reject', rule, {
  valid: [
    "/[0-9]/",
    "/[0-9]+/",
    "/[0-9]{0}/",
    "/[0-9]{1}/",
    "/[0-9][0-9][0-9]/",
    "var simple = /[0-9]{10}[0-9]{10}/",
    "var simple = /([0-9]{10})[0-9]{10}/",
    "var simple = /([0-9]{10}[0-9]{10})/",
    "/ab/ == /ab/",
    "new RegExp(/ab/) == new RegExp(/ab/)",
    "RegExp(/ab/) == RegExp(/ab/)",
    //"RegExp(/ab/).",
    "RegExp(/ab/).flags",
    "RegExp(/ab/).flags == 0",
    //"RegExp(/ab/).flags == ``",
    "/[0-9]\\d\\d00000000/",
    "/[0-9]\\d\\d00000000aaaaaa/",
    {code: 'var simple = /ab/;'},
    {code: 'var simple = /adjc/;'},
    {code: 'var simple = /[ad]/;'},
    {code: 'var simple = /[`a]/;'},
    {code: 'var simple = /[z{]/;'},
    {code: 'var simple = /[a][b]/;'},
    {code: 'var simple = /[a]+[b]/;'},
    {code: 'var simple = /[adlpkeaz]/;'},
    {code: 'var simple = /[0a-v]+/;'},
    {code: '/[0a-v]+/'},
    {code: '/[abc]aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/'},
  ],

  invalid: [
    {
      code: `var simple = /[abc]/;`,
      errors: [{
        message: 'simplify regex expression',
      }],
      output: 'var simple = /[a-c]/ ;',
    },
    {
      code: `var simple = /[abc]{1,2}/;`,
      errors: [{
        message: 'simplify regex expression',
      }],
      output: 'var simple = /[a-c]{1,2}/ ;',
    },
    {
      code: `var simple = /[^abc]/;`,
      errors: [{
        message: 'simplify regex expression',
        type: 'Literal',
      }],
      output: 'var simple = /[^a-c]/ ;',
    },
    {
      code: `var simple = /[^abc]+/;`,
      errors: [{
        message: 'simplify regex expression',
      }],
      output: 'var simple = /[^a-c]+/ ;',
    },
    {
      code: `var simple = /[cba]/;`,
      errors: [{
        message: 'simplify regex expression',
      }],
      output: 'var simple = /[c-a]/ ;', // TODO: invalid regex
    },
    {
      code: `var simple = /[cba]+/;`,
      errors: [{
        message: 'simplify regex expression',
      }],
      output: 'var simple = /[c-a]+/ ;',
    },
    {
      code: `var simple = /[a]/;`,
      errors: 0,
    },
    {
      code: 'return /[abcde]/;',
      errors: 1,
    },
    {
      code: '/[ttttt]/;',
      errors: 0
    },
    {
      code: '/ttttt/;',
      errors: 0
    },
  ],
})
