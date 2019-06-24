/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

const rule = require("../../../lib/rules/bool-concordance")
const RuleTester = require("eslint").RuleTester;

const valid = [
  {
    code: "var opts = {aaa: true}",
  },
  {
    code: "var opts = {'aaa': true}",
  },
  {
    code: "var a = {'noCache': true}",
  },
  {
    code: "var a = {'noChange': false }",
  },
  {
    code: "var obj = {'isChanged': true}",
  },
  {
    code: "var opts = {noChange: false, useCache: true}",
  },
  {
    code: "var opts = {infinity: Infinity, nan: NaN}",
  },
  {
    code: "var opts = {noTest}",
    parserOptions: { ecmaVersion: 6 },
  },
  {
    code: "var opts = {noTest, test: undefined, doCycle: true, doCycle: false, is: 0}",
    parserOptions: { ecmaVersion: 6 },
  },
  {
    code: "var arr = [true]; var opts = {noCache: arr[0]}",
    parserOptions: { ecmaVersion: 6 },
  },
  {
    code: "var myVariable = true; var opts = {noCache: myVariable}",
  },
  /* {
    code: "class Rectangle {\ncanBeFly = 0;\n}",
    parser: "babel-eslint",
    parserOptions: { ecmaVersion: 2019 },
  }, */
]
const invalid = [
  {
    code: "var a = {'noCache': 0}",
    errors: [{
      message: `message noCache`,
      type: "Property"
    }]
  },
  {
    code: "var a = {'noChange': NaN}",
    errors: [{
      message: `message noChange`,
      type: "Property"
    }]
  },
  {
    code: "var a = {'noChange': Infinity}",
    errors: [{
      message: `message noChange`,
      type: "Property"
    }]
  },
  {
    code: "var obj = {'isChanged': truee}",
    errors: [{
      message: `message isChanged`,
      type: "Property"
    }]
  },
  {
    code: "var opts = {'noChange': FALSE, 'noCache': TRUE}",
    errors: [{
      message: `message noChange`,
      type: "Property"
    }, {
      message: `message noCache`,
      type: "Property"
    }]
  },
  {
    code: "var opts = {noChange: FALSE, noCache: TRUE}",
    errors: [{
      message: `message noChange`,
      type: "Property"
    }, {
      message: `message noCache`,
      type: "Property"
    }]
  },
  {
    code: "var opts = {'noCache': FALSE}",
    errors: [{
        message: `message noCache`,
        type: "Property"
    }]
  },
]

var ruleTester = new RuleTester();
ruleTester.run("bool-concordance", rule, { valid, invalid });

module.exports = {
  valid,
  invalid
}