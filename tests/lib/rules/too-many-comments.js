var rule = require("../../../lib/rules/too-many-comments")

const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester()
ruleTester.run('too-many-comments', rule, {
  valid: [
    {code: 'var simple = /ab/;'},
    {code: '// a simple comment'},
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
      }],
    },
  ]
})
