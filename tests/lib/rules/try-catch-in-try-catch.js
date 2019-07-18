var rule = require("../../../lib/rules/try-catch-in-try-catch")

const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester()
ruleTester.run('try-catch-in-try-catch', rule, {
  valid: [
    {
        code: `
            try {
                y = require('y');
            } catch(error) {
                console.error(error);
            }`
    }, {
        code: `
            try {
                y = require('y');
            } catch(error) {
                console.error(error);
            }
            try {
                s = require('s');
            } catch(error) {
                console.error(error);
            }`
    },
  ],

  invalid: [
    {
      code: `
        try {
            try {
                y = require('y');
            } catch(error) {
                //...
            }
        } catch(error) {
            console.error(error);
        }`,
      errors: [{
        message: 'try in try',
        type: "TryStatement"
      }],
    }, {
        code: `
          try {
            //...
          } catch(error) {
              console.error(error);
            try {
                y = require('y');
            } catch(error) {
                //...
            }
          }`,
        errors: [{
          message: 'try in try',
          type: "TryStatement"
        }],
    }, {
        code: `
          try {
            //...
          } catch(error) {
              console.error(error);
          } finally {
            try {
                y = require('y');
            } catch(error) {
                console.error(error);
            }
        }`,
        errors: [{
          message: 'try in try',
          type: "TryStatement",
          line: 7
        }],
      },
  ]
})
