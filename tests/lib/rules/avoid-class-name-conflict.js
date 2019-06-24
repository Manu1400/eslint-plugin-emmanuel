/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

const rule = require("../../../lib/rules/avoid-class-name-conflict")
const RuleTester = require("eslint").RuleTester;

const valid = [
  {
    code: "class A {}",
  },
  {
    code: "class A extends B {}",
  },
  {
    code: "class A extends RTCError {}",
  },
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/class#Une_expression_simple
  {
    code: "var RTCError = class {}",
  },
  {
    code: "var RTCError = class extends Number {}",
  },
  {
    code: "var RTCError = class extends TestMS {}",
  },
]

const type = "Identifier"

const invalid = [
  {
    code: "class RTCError {}",
    errors: [{
      message: `redefine native RTCError`,
      type
    }],
  }, {
    code: "class Number { constructor() { console.log('test') } }; Number.NaN",
    errors: [{
      message: `redefine native Number`,
      type
    }],
  }, {
    code: "class Array {}",
    errors: [{
      message: `redefine native Array`,
      type
    }],
  }, {
    code: "class ServiceWorkerContainer {}",
    errors: [{
      message: `redefine native ServiceWorkerContainer`,
      type
    }],
  }, {
    code: "class Keyboard {}",
    errors: [{
      message: `redefine native Keyboard`,
      type
    }],
  }, {
    code: "class Accelerometer {}",
    errors: [{
      message: `redefine native Accelerometer`,
      type
    }],
  }, {
    code: "class Accelerometer extends A {}",
    errors: [{
      message: `redefine native Accelerometer`,
      type
    }],
  }, {
    code: "class AudioListener {}",
    errors: [{
      message: `redefine native AudioListener`,
      type
    }],
  }, { // with case
    code: "class audioListener {}",
    errors: [{
      message: `redefine native audioListener`,
      type
    }],
  }, {
    code: "class AnalyserNode {}",
    errors: [{
      message: `redefine native AnalyserNode`,
      type,
      line: 1,
      endLine: 1,
      column: 7,
      endColumn: 19
    }],
  }, { // alias from DOMMatrix ?
    code: "class WebKitCSSMatrix {}",
    errors: [{
      message: `redefine native WebKitCSSMatrix`,
      type
    }],
  }, {
    code: "class ImageBitmap {}",
    errors: [{
      message: `redefine native ImageBitmap`,
      type
    }],
  }, { // namespace: WebKit
    code: "class WebKitTest {}",
    errors: [{
      message: `define native WebKitTest but namespace WebKit is used by native`,
      type
    }],
  }, { // namespace: DOM, Media
    code: "class DOMClass {}",
    errors: [{
      message: `define native DOMClass but namespace DOM is used by native`,
      type
    }],
  }, {
    code: "class MSTest {}",
    errors: [{
      message: `define native MSTest but namespace MS is used by native`,
      type
    }],
  }, {
    code: "class MSCSSMatrix {}",
    errors: [{
      message: `redefine native MSCSSMatrix`,
      type
    }],
  }
]

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });
ruleTester.run("avoid-class-name-conflict", rule, { valid, invalid });

module.exports = {
  valid,
  invalid
}