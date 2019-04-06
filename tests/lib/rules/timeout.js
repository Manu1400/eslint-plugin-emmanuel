var rule = require("../../../lib/rules/timeout")

const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester()
ruleTester.run('allo ici le TGV en retard', rule, {
  valid: [
    {code: 'var simple = /[a]+[b]/;'},
  ],

  invalid: [
    {
      code: 'return /[abcde]/;',
      errors: 10,
    },
  ],
})
