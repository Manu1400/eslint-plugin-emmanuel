"use stric"; // no warning about distance: letter t is missing
// see https://eslint.org/docs/rules/strict for having use strict examples

require ("pROmise")

require ("promise")

require ("Promise")

// https://github.com/callstack/eslint-config-callstack/issues/12
var menubar = 0
window.u2f = 0
window.menubar = 0

// https://twitter.com/kentcdodds/status/1108008276577247233
const {URL} = require('url') // not need on Node v10.15.1
new URL(import.meta.url).pathname


const c = {"max-lines-per-function": ["error", { "max": 20 }]},
      d = {"max-lines-per-function": ["error", 20]}

var a = 0 // variable

throw ("How can I add new product when no value provided?");

/*
var a = function foo(bar) {
    var bar = "";
    return bar
}(1);
*/

// issue: https://twitter.com/jamiedixon/status/1065979641779970048
const fn = function (bar) {
    return fn();
}

// warning: infity-loop
function recursive (bar) {
    return recursive(bar);
}

// https://www.npmjs.com/package/eslint-plugin-jsdoc#why-not-capital-case-everything
// https://github.com/gajus/eslint-plugin-jsdoc#reference-to-jscs-jsdoc
(new String('lard') === 'lard') // false

// https://twitter.com/thekitze/status/809797332803928068


// https://eslint.org/docs/rules/no-param-reassign
// https://stackoverflow.com/questions/3242485/why-isnt-a-functions-arguments-object-an-array-in-javascript
// eslint-disable-next-line require-jsdoc
function f(x) {
    console.log(arguments[0]);   // Displays the initial value of the argument x
    x = 5;                       // Changes the value of the local variable x
    console.log(arguments[0]);   // Now displays 5
}

// https://github.com/juwai/style-guide/blob/master/language-javascript.md

// new rule idea:
// https://github.com/eslint/eslint/issues/6776
// other rule idea: https://eslint.org/docs/rules/max-lines-per-function

// strange ? https://github.com/OpenEarthDemo/valiton/blob/cca7d930183efdb1cd7be62c5c783a5be4651b2e/src/core/opcua-iiot-core-connector.js#L18
var de = de || {biancoroyal: {opcua: {iiot: {core: {connector: {}}}}}}
de.biancoroyal.opcua.iiot.core.connector.core = de.biancoroyal.opcua.iiot.c

// https://github.com/BenGrandin/AlgoJS/blob/1ce8d43461d3051d14c2596cbcc9fd625ce47dee/td/td2.js#L14
// Fonction pour afficher l'alphabet en minuscule
function alphabet_az() {
	var sequence = '';
	// Ne rien modifier au dessus de ce commentaire

	for(i=97,a='';i<123;)a+=String.fromCharCode(i++)

	// Ne rien modifier au dessous de ce commentaire
	return sequence;
}

