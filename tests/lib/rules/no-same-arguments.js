const rule = require("../../../lib/rules/no-same-arguments")
const RuleTester = require("eslint").RuleTester;

const valid = [
    {
        code: `Math.hypot(dx, dy);`,
    }, {
        code: `Math.hypot(dx, dx);`,
        options: ["Math", "imul"], // Math.imul(3, 4)
    }, {
        code: `Math.imul(dx, dx);`,
        options: ["Math"], // second option missing
    }
]
const invalid = [
    {
        code: `Math.hypot(dx, dx);`,
        options: ["Math", "hypot"],
        errors: [{
            message: `same param on Math.hypot, maybe a typing mistake`,
            type: "CallExpression",
        }]
    }, {
        code: `Math.imul(dx, dx);`,
        options: ["Math", "imul"],
        errors: [{
            message: `same param on Math.imul, maybe a typing mistake`,
            type: "CallExpression",
        }]
    }
]

var ruleTester = new RuleTester();
ruleTester.run("no-same-arguments", rule, { valid, invalid });

module.exports = {
  valid,
  invalid
}
