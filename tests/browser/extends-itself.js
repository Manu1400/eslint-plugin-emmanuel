let Animal = class {
    constructor(name) {
      this.name = name;
    }
  };

class Gorilla extends Animal {}

class Fish extends Fish {}

// too similar = bad idea
class FishA extends Fish {}

class Number extends Number {}

// valid
class number extends Number {}
class obj extends Object {}
class na extends null {}

"ClassDeclaration[superClass.name]"

let SmallFish = class extends Fish {};

// valid
// from https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes
let calculetteMixin = Base => class extends Base {
    calc() { }
};

// https://javascript.info/custom-errors
class PropertyRequiredError extends ValidationError {
    constructor(property) {
      super("No property: " + property);
      this.name = "PropertyRequiredError";
      this.property = property;
    }
}

// Foo is not a Error class name -> need eslint rule
class RequiredError extends Foo {
    constructor(property) {
      super("No property: " + property);
      this.name = "PropertyRequiredError";
      this.property = property;
    }
}

// not a good idea
var extend = 0

// please no, see package https://www.npmjs.com/package/ts-custom-error
class MyError extends Error {
    constructor(m) {
        super(m)
    }
}

var duration = -1
let durationNight = Infinity
const durationFromMars = null
// var variable
let variousData
const variable = 0 // WTF

// http://sametmax.com/un-gros-troll-de-plus-sur-javacscript/
{a: 3} + [33] // WTF

// https://www.destroyallsoftware.com/talks/wat lol

// https://medium.com/@luke_smaki/javascript-es6-classes-8a34b0a6720a
function User(name) {
    this.name = name
}
const jean = new User("jean")

// https://github.com/lydiahallie/javascript-questions#3-whats-the-output
const shape = {
    radius: 10,
    diameter() {
      return this.radius * 2;
    },
    perimeter: () => 2 * Math.PI * this.radius // <-- global
  };
  
  shape.diameter();
  shape.perimeter();

// https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/securite_bonne_pratique

// ----
// https://eslint.org/docs/rules/no-empty-character-class
var abcNeverMatches = new RegExp("^abc[]");

// https://github.com/lydiahallie/javascript-questions#5-which-one-is-not-valid
const bird = {
    size: "small"
  };
  
  const mouse = {
    name: "Mickey",
    small: true
  };

mouse.bird.size // <--

// https://github.com/lydiahallie/javascript-questions#22-how-long-is-cool_secret-accessible
localStorage.clear()

/*eslint no-prototype-builtins: "error"*/
/*eslint no-extend-native: "error"*/


Object.prototype.give = () => {
    return "give";
}

// never check if giveLydiaPizza is called
String.prototype.giveLydiaPizza = () => {
    return "Just give Lydia pizza already!";
};