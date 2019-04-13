NaN = NaN


NaN = 0

var NaN = function (value) {}

var a = 3

NaN(3)

var arr = ["", "", ""]
arr[3]

debugger;
eval("debugger;");

const log = require('captains-log')();

// avoid this variable, an avoid variable with $
$FlowFixMe = 1
test.$FlowFixMe
function $FlowFixMe() {}

// $FlowFixMe: suppressing this error until we can refactor
// $FlowFixMe

// evil:
// other example: https://www.youtube.com/watch?v=kuHfMw8j4xk
//while (true) {
//}
// duplicate arguments in function definitions
function bb (a, A, b, b) {
    ;
}

// https://twitter.com/acutmore/status/808594935259811840
() => {} // eslint-disable-line no-empty-function <= I make it 50 chars

() => {};

function empty() {
    // empty code
}

function foo() {}

// idea: preprocessor ?
eval("debugger;");

// https://en.wikipedia.org/wiki/Windows_Script_Host
// "wsh": true, in .jshintrc
WSH.Echo("Hello world");
WSH.Quit();

//TODO: add the case é in config
var é // need french keyword

var p = 0
- --p
+ ++p
++p + 0
--p - 0
p++ +p
p-- -p
const CONST = 2
var VAR = 3
const FUNCTION = 2
const CONST_a = 1
var VAR_a
var functioN
const consT = 2
var $
var aéù

"$1 $2" // specific rule (to can disable the rule)

// compare consequent and alternate in tree parser
// other: https://eslint.org/docs/rules/no-self-compare
a ? a : a
a ? f() : f()
a ? Math.random() : Math.random() // it s a trap...

Number(Math.random()) // or not
isNaN(Math.random()) // avoid but dont remplace

// SequenceExpression
P,/**/
l