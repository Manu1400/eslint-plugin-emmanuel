var rule = require("../../../lib/rules/ts-type")

const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester()
ruleTester.run('ts-type', rule, {
  valid: [
    {
        code: `function myFunction(isPublic : boolean) {}`,
        parser: "@typescript-eslint/parser"
    }, {
        code: `function myFunction(test : string) {}`,
        parser: "@typescript-eslint/parser"
    }, {
        code: `function myFunction() {}`,
    }, {
        code: `function myFunction(is) {}`,
    }, {
        code: `const myFunction = function (isPublic) {}`,
        parser: "@typescript-eslint/parser"
    }, {
        code: `function warnUser(): void {}`,
        parser: "@typescript-eslint/parser"
    }, {
        code: `function displayUser(user) : void {}`,
        parser: "@typescript-eslint/parser"
    }, {
        code: `function display() : void {}`,
        parser: "@typescript-eslint/parser"
    }
  ],

  invalid: [
    {
      code: `function myFunction(isPublic : string) {}`,
      parser: "@typescript-eslint/parser",
      errors: [{
        message: 'type error',
        type: "Identifier"
      }],
    }, {
        code: `function myFunction(isPublic : string, isFutur : number) {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
          message: 'type error',
          type: "Identifier",
          line: 1,
          column: 21,
          endColumn: 38
        }, {
            message: 'type error',
            type: "Identifier",
            endColumn: 56
        }],
    }, {
        code: `function myFunction(isPublic : string | boolean) {}`,
        //output: `function myFunction(isPublic : boolean) {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
          message: 'type error',
          type: "Identifier",
          column: 21,
          endColumn: 48
        }],
    }, {
        code: `function myFunction(isPublic : any) {}`,
        //output: `function myFunction(isPublic : boolean) {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
          message: 'type error',
          type: "Identifier"
        }],
    }, {
        code: `function myFunction(isPublic) {}`,
        output: `function myFunction(isPublic : boolean) {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
          message: 'missing type',
          type: "Identifier"
        }],
    }, {
        code: `function myFunction(listUsers) {}`,
        output: `function myFunction(listUsers : any[]) {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
          message: 'missing type',
          type: "Identifier"
        }],
    }, {
        code: `function myFunction(str) {}`,
        output: `function myFunction(str : string) {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
          message: 'missing type',
          type: "Identifier"
        }],
    }, {
        code: `function warnUser() {}`,
        output: `function warnUser() : void {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
            message: 'missing `: void`',
            type: "FunctionDeclaration"
        }],
    }, {
        code: `function displayUser(user) {}`,
        output: `function displayUser(user) : void {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
            message: 'missing `: void`',
            type: "FunctionDeclaration"
        }],
    }, {
        code: `function display() {}`,
        output: `function display() : void {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
            message: 'missing `: void`',
            type: "FunctionDeclaration"
        }],
    }, /* {
        code: `const display = function () {}`,
        output: `const display = function () : void {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
            message: 'missing `: void`',
            type: "FunctionDeclaration"
        }],
    }, */ { // param missing: (user)
        code: `function displayUser() : void {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
            message: 'param missing',
            type: "FunctionDeclaration"
        }],
    }, {
        code: `function displayUserAndAnimal() : void {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
            message: 'param missing',
            type: "FunctionDeclaration"
        }],
    }, {
        code: `function find() : void {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
            message: 'param missing',
            type: "FunctionDeclaration"
        }],
    }, /* { // return missing
        code: `function getUser() : void {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
            message: 'no return void',
            type: "FunctionDeclaration"
        }],
    }, */ {
        code: `function getRandomStr() : number {}`,
        parser: "@typescript-eslint/parser",
        errors: [{
            message: 'returnType incorrect',
            type: "TSTypeAnnotation"
        }],
    },
  ]
})
