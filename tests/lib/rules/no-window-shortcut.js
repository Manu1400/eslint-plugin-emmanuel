"use strict";

const rule = require("../../../lib/rules/no-window-shortcut")
const RuleTester = require("eslint").RuleTester;

const valid = [
  { // not a good idea
    code: "var caches = 0",
  },
  {
    code: "caches = 0",
  },
  {
    code: "window.caches",
  },
  {
    code: "thing.caches",
  },
  {
    code: "caches",
  },
  {
    code: "caches++",
  }, {
    code: `
    var array = new Uint32Array(10);
    window.crypto.getRandomValues(array);`
  }, {
    code: "self.window.self.window.self.print()",
  }, {
    code: "self.print()",
  }, {
    code: "Object.keys(document)",
  }
]
const invalid = [
  { // from https://developer.mozilla.org/fr/docs/Web/API/CacheStorage
    code: "caches.open('v1')",
    output: "window.caches.open('v1')",
    errors: [{
      message: "prefer `window.caches`",
      type: 'Identifier'
    }]
  },
  {
    code: "typeof caches.match",
    output: "typeof window.caches.match",
    errors: [{
      message: "prefer `window.caches`",
      type: 'Identifier'
    }]
  }, {
    code: "typeof caches.match",
    output: "typeof window.caches.match",
    errors: [{
        message: "prefer `window.caches`",
        type: 'Identifier'
    }]
  },
  {
    code: "caches.match(event.request)",
    output: "window.caches.match(event.request)",
    errors: [{
        message: "prefer `window.caches`",
        type: 'Identifier'
    }]
  },
  {
    code: "caches.match('/sw-test/gallery/myLittleVader.jpg')",
    output: "window.caches.match('/sw-test/gallery/myLittleVader.jpg')",
    errors: [{
        message: "prefer `window.caches`",
        type: 'Identifier'
    }]
  }, {
    code: "print()",
    output: "window.print()",
    errors: [{
        message: "prefer `window.print`",
        type: 'Identifier'
    }]
  }, { // similar to `print()`
    code: "print.call()",
    output: "window.print.call()",
    errors: [{
        message: "prefer `window.print`",
        type: 'Identifier'
    }]
  }, {
    code: "chrome.loadTimes().firstPaintTime",
    output: "window.chrome.loadTimes().firstPaintTime",
    errors: [{
        message: "prefer `window.chrome`",
        type: 'Identifier'
    }]
  }, {
    code: "chrome.app.isInstalled",
    output: "window.chrome.app.isInstalled",
    errors: [{
        message: "prefer `window.chrome`",
        type: 'Identifier'
    }]
  }, {
    code: "screen.colorDepth",
    output: "window.screen.colorDepth",
    errors: [{
        message: "prefer `window.screen`",
        type: 'Identifier'
    }]
  }, {
    code: `if (screen.pixelDepth < 8) { ;}`,
    output: `if (window.screen.pixelDepth < 8) { ;}`,
    errors: [{
        message: "prefer `window.screen`",
        type: 'Identifier'
    }]
  }, {
    code: "keys(document)",
    output: `Object.keys(document)`,
    errors: [{
      message: "prefer `Object.keys`",
      type: 'Identifier'
    }]
  }, {
    code: "keys()",
    output: `Object.keys()`,
    errors: [{
      message: "prefer `Object.keys`",
      type: 'Identifier'
    }]
  }
]

var ruleTester = new RuleTester();
ruleTester.run("no-window-shortut", rule, { valid, invalid });

// for doing statistics about tests
module.exports = {
  valid,
  invalid
}