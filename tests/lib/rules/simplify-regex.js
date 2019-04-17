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
    // from https://github.com/BrainMaestro/eslint-plugin-optimize-regex/blob/master/tests/lib/rules/optimize-regex.js
    'var foo = /baz/i',
    'var foo = /bar/mig',
    'var foo = /\\/\\./',
    'var foo = /[/\\\\]$/',
    // https://github.com/knockout/knockout/blob/9893233413e467a40919237e524b545e335c1050/Gruntfile.js#L83
    "var fragments = grunt.config('fragments'), \n sourceFilenames = [ \n fragments + 'extern-pre.js', \n fragments + 'amd-pre.js', \n getReferencedSources(fragments + 'source-references.js'), \n ]"
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
