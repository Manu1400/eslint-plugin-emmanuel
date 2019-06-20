const rule = require("../../../lib/rules/avoid-typing-mistake")
const RuleTester = require("eslint").RuleTester;

const valid = [
    {
        code: `class A { constructor (b) { this.b = b } }`
    }, {
        code: `class a { constructor(user){ this.user = user} }`
    }, {
        code: `
        class Rectangle {
            constructor(hauteur, largeur) {
              this.hauteur = hauteur;
              this.largeur = largeur;
            }
        }`
    }, {
        code: `
        let Rectangle = class {
            constructor(hauteur, largeur) {
              this.hauteur = hauteur;
              this.largeur = largeur;
            }
        };`
    }, {
        code: `function construct(hauteur, largeur) {}`
    }
]
const invalid = [
    {
        code: `class myClass {
            constructo (user) { // <-- mistake
                this.user = user;
            }
        }`,
        errors: [{
            message: `mistake on constuctor`,
            type: "MethodDefinition",
        }]
    }, {
        code: `class myClass {
            constructorr (user) { // <-- mistake
                this.user = user;
            }
        }`,
        errors: [{
            message: `mistake on constuctor`,
            type: "MethodDefinition",
        }]
    }, {
        code: `class myClass {
            constructor (user) {
                this.user = user;
            }
            constructo (user) { // <-- it is a trap.
                this.user = user;
            }
        }`,
        errors: [{
            message: `mistake on constuctor`,
            type: "MethodDefinition",
            line: 5
        }]
    }, {
        code: `class myClass {
            con (user) { // <-- mistake
                this.user = user;
            }
        }`,
        // eslint-disable-next-line no-magic-numbers
        options: [10, `constructor`],
        errors: [{
            message: `mistake on constuctor`,
            type: "MethodDefinition",
        }]
    }, {
        code: `class t { CONSTRUCTOR(user) { console.log(user) } }`,
        // output: `class t { CONSTRUCTOR(user) { console.log(user) } }`, // no change
        errors: [{
            message: `mistake on constuctor`,
            type: "MethodDefinition",
        }]
    }, /* {
        code: `
        class Rectangle {
            constructor(hauteur, largeur, _test) { // <-- mistake
              this.hauteur = hauteur;
              this.largeur = largeur;
            }
        }`,
        errors: [{
            message: `mistake on constuctor`,
            type: "MethodDefinition",
        }]
    }, */ {
        code: `
        class test extends otherclass {
            constructor(hauteur, Hauteur) { // <-- mistake
              super()
            }
        }`,
        errors: [{
            message: `mistake on params constuctor`,
            type: "MethodDefinition",
        }]
    }, { // double mistake, only one detect
        code: `
        class test extends otherclass {
            CONSTRUCTOR(hauteur, Hauteur) { // <-- double mistake
              ;
            }
        }`,
        errors: [{
            message: `mistake on constuctor`,
            type: "MethodDefinition",
        }]
    }
]

var ruleTester = new RuleTester({parserOptions: { ecmaVersion: 2019 }});
ruleTester.run("avoid-typing-mistake", rule, { valid, invalid });

module.exports = {
  valid,
  invalid
}
