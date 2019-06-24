/*eslint no-hyogo-police/infinite-loop: "error"*/
function aaa() {
    bbb()
}

function bbb() {
    aaa()
}
// ----
const ccc = function () {
    var a = 1 || ddd()
    var b = ddd.call()
}
const ddd = function () {
    ccc()
}

// edited source from https://www.w3schools.com/js/js_function_call.asp
var person = {
    fullName: function() {
      return this.first() + " " + this.lastName;
    }
}
var person1 = {
    firstName: "John",
    lastName: "Doe",
    first: function() {
        //return person.fullName() // loop -> TypeError: this.first is not a function
        return this.firstName
    },
}
person.fullName.call(person1);

/*eslint id-blacklist: ["error", "data", "require", "__dirname", "__filename"] */
console.log(__dirname);
//const __dirname = 0
//console.log(__dirname);

console.log(__filename);
//const __filename = "lll"
//console.log(__filename);