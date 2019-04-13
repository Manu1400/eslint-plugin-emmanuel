NaN = "jj"

undefined = "jj"

// eslint-disable-next-line no-magic-numbers
var x = 10;
if (x === x) {
    x = 20;
}
if (Number(x) === Number(x)) { // useless
    x = 20;
}
if (Math.random() === Math.random()) {
    x = 20;
}
// fixed proposal can be:
var first = Math.random();
var second = Math.random()
if (first === second) {
    x = 20;
}