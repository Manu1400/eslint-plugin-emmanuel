
var re = new RegExp("foo {3}bar");
// --fix shoud be:
var re = /foo {3}bar/;

new RegExp()    // -> /(?:)/
new RegExp("")  // -> /(?:)/

// see https://eslint.org/docs/rules/no-div-regex
const a = /=foo/
const b = /\=foo/