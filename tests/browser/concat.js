var foo = "a" + "b";
var somestring = `some` + `string`;
var a = '1' + '0';
var b = '1' + `0`;
var c = `1` + '0';
var d = `1` + `0`;
var e = `` + ``;
var f = `1` + `0` + `2`;

var l = '\"' + '0'; // ok
//var c = `\"1` + '\"0' // expected: ""1"0", not "\"1"0"
//var d = `\"1` + '\"0' + "\""

var value = "dd"
var p = `"${value}"` + `"${value}"`
var str = `Time: ` + `${12 * 60 * 60 * 1000}`;
var str = `Time: ` + `${'hh' + 'dd'}`;


var ok = "ab";
// when a non string is included
var c = a + b;
var c = '1' + a;
var a = 1 + '1';
var c = 1 - 2;
// when the string concatenation is multiline
var c = "foo" +
    "bar";
