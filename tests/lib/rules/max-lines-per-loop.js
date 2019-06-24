/**
 * @fileoverview use Math constants
 * @author Emmanuel
 */
"use strict";

const rule = require("../../../lib/rules/max-lines-per-loop")
const RuleTester = require("eslint").RuleTester;

const valid = [
  {
    code: "for (;;) { }",
  },
  {
    code: "for(i=97,a='';i<123;)a+=String.fromCharCode(i++)",
  },
  {
    code: `while (isConcatenation(left)) {
        left = left.right;
    }`
  },
  {
    code: `for(i=0;i<123;i++) {
        for(j=0;j<123;j++) {
            ;
        } 
    }`
  }, {
    code: `do {
        left = left.right;
    } while (isConcatenation(left))`
  }, {
    code: `for (var thing of things) {
        results.push(bar(thing));
      }`
  },
]
const invalid = [
  {
    // infinite loop
    code: `for (;;) {
        // lines
        // deux
        // trois
        // quatre
        // cinq
        // six
        // sept
        // huit
        // neuf
        // dix
        // onze
        ;
    }`,
    errors: [{
      message: `too many lines in for`,
      type: "BlockStatement"
    }]
  },   {
    // infinite loop
    code: `for (;;) {
        // lines
        // deux
        ;
    }`,
    options: [1],
    errors: [{
      message: `too many lines in for`,
      type: "BlockStatement"
    }]
  }, {
    code: `do {
        left = left.right;
        a = 0
    } while (isConcatenation(left))`,
    options: [1],
    errors: [{
        message: `too many lines in do while`,
        type: "BlockStatement"
      }]
  }, {
    code: `while (isConcatenation(left)) {
        left = left.right;
        a = 0
    }`,
    options: [1],
    errors: [{
        message: `too many lines in while`,
        type: "BlockStatement"
      }]
  },
]

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });
ruleTester.run("max-lines-per-loop", rule, { valid, invalid });

// for doing statistics about tests
module.exports = {
  valid,
  invalid
}