var rule = require("../../../lib/rules/too-many-comments")

const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester()
ruleTester.run('too-many-comments', rule, {
  valid: [
    {code: 'var simple = /ab/;'},
    {code: '// a simple comment'},
    {
      code: '// a simple comment',
      options: [1],
    },
    {
      code: 'var simple = /c/;',
      options: [0],
    },
  ],

  invalid: [
    {
      code: `// comment one
      // comment two
      // comment ...
      // comment ....
      // comment .....
      // comment ......
      // comment .......
      // comment ........
      // comment .........
      // comment ..........
      // comment .......... .
      // comment .......... ..
      // comment .......... ...
      `,
      errors: [{
        message: 'too many comments in this file with 13 comments',
        type: "Line"
      }],
    }, {
      code: `// comment one`,
      options: [0],
      errors: [{
        message: 'too many comments in this file with 1 comments',
      }],
    }, {
      code: `/* comment */`,
      options: [0],
      errors: [{
        message: 'too many comments in this file with 1 comments',
        type: "Block"
      }],
    }, {
      code: `/* comment */`,
      parser: "flow-parser",
      options: [0],
      errors: [{
        message: 'too many comments in this file with 1 comments',
        type: "Block"
      }],
    }, {
      code: `// use parser flow-parser`,
      parser: "flow-parser",
      options: [0],
      errors: [{
        message: 'too many comments in this file with 1 comments',
        type: "Line"
      }],
    },
  ]
})
