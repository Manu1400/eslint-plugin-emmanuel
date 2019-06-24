/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

const rule = require("../../../lib/rules/compare-regex")
const RuleTester = require("eslint").RuleTester;

const valid = [
  "var a = (RegExp(/aa/).flags = \"i\")", // WTF
  {
    code: "var fastDeepEqual = require('fast-deep-equal'); fastDeepEqual(/a/, /a/)",
  },
  {
    code: "require('fast-deep-equal')(/a/, /a/)",
  },
  {
    code: "var bool = a == a",
  },
  {
    code: "/a/ + /a/",
  },
  {
    code: "/a/ - /a/",
  },
]
const invalid = [
  {
    code: "/foo/ == /foo/",
    output: "require('fast-deep-equal')(/foo/, /foo/)",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
      type: "BinaryExpression"
    }]
  },
  {
    code: "/foo/ === /foo/",
    output: "require('fast-deep-equal')(/foo/, /foo/)",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  {
    code: "/aaa/ == /abc/",
    output: "require('fast-deep-equal')(/aaa/, /abc/)",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  {
    code: "/ / === /   /",
    output: "require('fast-deep-equal')(/ /, /   /)",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  {
    code: "/abc/ !== /efg/",
    output: "require('fast-deep-equal')(/abc/, /efg/) === false",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  {
    code: "/abc/ != /efg/",
    output: "require('fast-deep-equal')(/abc/, /efg/) === false",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  // flags
  {
    code: "/abc/i != /efg/",
    output: "require('fast-deep-equal')(/abc/i, /efg/) === false",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  {
    code: "/abc/ig != /efg/gi",
    output: "require('fast-deep-equal')(/abc/ig, /efg/gi) === false",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  // new RegExp('\\w+');
  // nope
  /*
  {
    code: "new RegExp(/aa/) == /ab/",
    output: "require('fast-deep-equal')(/aa/, /ab/)",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  */
  /*
  {
    code: "new RegExp(/aa/) === new RegExp(/aa/)",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  {
    code: "new RegExp(/aa/) !== new RegExp(/aa/)",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  {
    code: "new RegExp(/a/) !== new RegExp(/other/)",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  {
    code: "new RegExp(/a/) !== new RegExp(/other/)",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  {
    code: "RegExp(/aa/) == RegExp(/aa/)",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  {
    code: "RegExp(/aa/) != RegExp(/aa/)",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  {
    code: "RegExp(/aa/) !== RegExp(/aa/)",
    errors: [{
      message: `regex comparaison return false, use fast-deep-equal package`,
    }]
  },
  */
]

var ruleTester = new RuleTester({parser: "espree"});
ruleTester.run("compare-regex", rule, { valid, invalid });

var ruleTester = new RuleTester({parser: "flow-parser"});
ruleTester.run("compare-regex", rule, { valid, invalid });

var ruleTester = new RuleTester({parser: "babel-eslint"});
ruleTester.run("compare-regex", rule, { valid, invalid });

// for doing statistics about tests
module.exports = {
  valid,
  invalid
}