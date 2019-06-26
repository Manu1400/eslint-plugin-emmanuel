/**
 * @fileoverview use Math constants
 * @author Emmanuel
 */
"use strict";

const rule = require("../../../lib/rules/negative-array")
const RuleTester = require("eslint").RuleTester;

const valid = [
  {
    code: "['🐴', '🎂', '🌈'][0]",
  }, {
    code: "['🐴', '🎂', '🌈'][1]",
  }, {
    code: "['🐴', '🎂', '🌈'][-0]",
  }, {
    code: "['🐴', '🎂', '🌈'][-.1]",
  }, {
    code: "negativeArray(['🐴', '🎂', '🌈'])[-1]",
  }, {
    code: "['🐴', '🎂', '🌈'][NaN]",
  }, {
    code: "['🐴', '🎂', '🌈'][undefined]",
  }, {
    code: "var index = -1; ['🐴', '🎂', '🌈'][index]",
  }, { // bad but difficult to detect
    code: "var index = -1; var arr = []; arr[index]",
  }, {
    code: `var test: any = ['🐴', '🎂', '🌈'][0]`,
    parser: "@typescript-eslint/parser"
  }, {
    code: `var test: string = ['🐴', '🎂', '🌈'][0]`,
    parser: "@typescript-eslint/parser"
  }, {
    code: `var arr = (['🐴', '🎂', '🌈']); arr[-1]`,
    parser: "@typescript-eslint/parser",
    errors: 0
  }
]
const invalid = [
  {
    code: "['🐴', '🎂', '🌈'][-1]",
    output: `negativeArray(['🐴', '🎂', '🌈'])[-1]`,
    errors: [{
      message: `use package negative-array to having negative array index support`,
      type: "MemberExpression"
    }]
  }, {
    code: "['🐴', '🎂', '🌈'][-6]",
    output: `negativeArray(['🐴', '🎂', '🌈'])[-6]`,
    errors: [{
      message: `use package negative-array to having negative array index support`,
      type: "MemberExpression"
    }]
  }, {
    code: "['🐴', '🎂', '🌈'][(-1)]",
    output: "negativeArray(['🐴', '🎂', '🌈'])[-1]", // strange ?
    errors: [{
      message: `use package negative-array to having negative array index support`,
      type: "MemberExpression"
    }]
  }, {
    code: "['🐴', '🎂', '🌈'][-(1)]",
    output: "negativeArray(['🐴', '🎂', '🌈'])[-(1)]",
    errors: [{
      message: `use package negative-array to having negative array index support`,
      type: "MemberExpression"
    }]
  }, {
    code: "[][-(1)]",
    output: "negativeArray([])[-(1)]",
    errors: [{
      message: `use package negative-array to having negative array index support`,
      type: "MemberExpression"
    }]
  }, {
    code: `var arr : string[]  = (['🐴', '🎂', '🌈']); arr[-1]`,
    parser: "@typescript-eslint/parser",
    errors: 0
  }, {
    code: `function last(arr: any[]) : any {
        return arr[-1]
    }`,
    parser: "@typescript-eslint/parser",
    errors: 0
  }, {
    code: `function myFunction(arr = ['default']) {
        return arr[-1]
      }`,
    errors: 0
  }, {
    code: `function myFunction(arr : string[] = ['default']) {
        return arr[-1]
      }`,
    parser: "@typescript-eslint/parser",
    errors: 0
  }
]

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });
ruleTester.run("negative-array", rule, { valid, invalid });

// for doing statistics about tests
module.exports = {
  valid,
  invalid
}