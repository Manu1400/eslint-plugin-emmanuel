// see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Uint8Array#Propri%C3%A9t%C3%A9s
// Uint8Array.BYTES_PER_ELEMENT : 1
// Int8Array.BYTES_PER_ELEMENT  : 1

const BYTES_PER_ELEMENT = 1

var BYTES = 1

if (BYTES == 1) {
    console.log(1)
}

new Uint8Array(); // apparu avec ES2017

// -----
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/TypedArray#Syntaxe
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/TypedArray#Les_objets_TypedArray
// Int8Array:	-128 à 127

var arr = new Int8Array([21, 31]); // ok

// need: add an eslint error
var arr = new Int8Array([1000, -1000]); // nope -> easy to try

// ----
var int8 = new Int8Array(2);
int8[0] = 42;
int8.BYTES_PER_ELEMENT // 1

// ---
// https://github.com/nefe/You-Dont-Need-jQuery#promises
