//const regex1 = /[abc]/
//const regex2 = /[a-c]/; //nk ji  jj
 //
//const invalid = /[c-a]/
//
//console.log(regex1) // yhh
//console.log(regex2) //
//console.log(invalid) //

// /[abcdef]/
//
Number(1)
Number(1).toExponential()


Number('123')
new Number('123')
Number.parseInt()
parseInt = Number.parseInt

Number()
Number().toExponential()
new Number(valeur);
var a = new Number('123'); // a === 123 donnera false
var b = Number('123'); // b === 123 donnera true
a instanceof Number; // donnera true
b instanceof Number; // donnera false

bool = true

Number("not")

parseInt(2)

// don't
new Array(10, "")
new Array(10, undefined)
Array(10, "")
new Array()
Array()

Array(bool ? 20000: 20001)
Array(bool == bool ? 20005: 20004)
Array(bool == bool ? 1: 20004)
new Array(10000000000000000)
const b = new Array(10000000000000000)
const a = Array(10000000000000000);
const c = Array(1e10);
const d = Array(1e10 + 1);
const e = Array(Number(100))
const f = Array(Number("1000"))

new Intl.Locale("pl-u-hc-h12", {
  calendar: 'gregory'
});

window.clearTimeout(3, 2)
clearTimeout(timeoutID)
clearTimeout(1, 2)

function e() {

}
e()

const object2 = Object.freeze(object1);
Object.freeze();

(new RegExp("a\bc")).test("a\bc")
const r = /^(\d)$/
(/^(\d)$/).test("a\bc")
///^(\d)$/.test("a\bc") -> parsing error
console.log("fail")

try {
  throw new Error('error that should not be ignored');
} catch {
  console.log('something happened');
}

e instanceof Array

9007199254740991
const alsoHuge = BigInt(9007199254740991);

RegExp('.', 'i') // valid flag
RegExp('.', 'ii') // valid flag but double i

new RegExp('ab+c', 'i');
new RegExp('ab+c', '');

Math.seededRandoms()

//var $ = ""
//delete $

var $ = {each: function() {}}
$.each()

this.$('body').addClass('expanded');
$('body').addClass('expanded')

// invalid
const largeConstant1 = 1234567890123456789;
const largeConstant2 = 1.234567890123456789e19;

Number(1234567890123456) // ok
Number(12345678901234567) // 12345678901234568
Number(123456789012345671234567890123456712345678901234567)
Number("123456789012345671234567890123456712345678901234567")

for(var i = 0; i = 1;i++){}

function fn() {};