/**
 * @fileoverview Rule to disallow some infinite loop
 * @author Masami Asai aka. pipboy3000, Emmanuel
 */

"use strict";

const safeEval = require("safe-eval")

const testCode = (code="", variables = {}) => {
    var bool = true
    try {
        bool = safeEval(code, variables)
    } catch (error) {
        bool = false; // true -> to detect globals
    }
    return bool
}

const create = (context) => {
    // maybe :exit, see https://eslint.org/docs/developer-guide/working-with-rules#rule-basics
    return {
      "ForStatement": (node) => {
        if (!node.test ||
          (node.test && node.test.type !== "BinaryExpression")) {
            context.report({
                node: !node.test ? node : node.test,
                messageId: 'infiniteLoop'
            })
        }
      },
      "ForStatement > BlockStatement > EmptyStatement, DoWhileStatement > BlockStatement > EmptyStatement": (node) => {
        context.report({
            node,
            message: 'block with only `;` in for' // :/
        })
      },
      "ForStatement > BlockStatement ExpressionStatement > CallExpression[callee.property.name='splice']": (node) => {
        // const name = node.callee.object.name // OK
        // const forName = node.body // undefined
        context.report({
            node,
            message: 'maybe a infinite loop: array.splice in a for'
        })
      },
      "WhileStatement[test.type!='BinaryExpression'], DoWhileStatement[test.type!='BinaryExpression']": (node) => {
        const { name, value } = node.test

        if (name !== "undefined" && name !== "NaN" && value !== null &&
          value !== false && value !== 0) {
            context.report({
                node: node.test,
                messageId: 'infiniteLoop'
            })
        }
      },
      // or just "WhileStatement"
      "WhileStatement[test.type='BinaryExpression'], DoWhileStatement[test.type='BinaryExpression']": (node) => {
        const sourceCode = context.getSourceCode();
        const str = sourceCode.getText(node.test)
        
        const { variables } = context.getScope()
        // TODO: only if env `node` is activate
        let variablesArr = { __filename } // { require }
        variables.map((variable) => {
            // console.log (variable.name)
            variable.identifiers.map((identifier) => {
                if (identifier && identifier.parent && identifier.parent.init) {
                    variablesArr[variable.name] = identifier.parent.init.value || sourceCode.getText(identifier.parent.init);
                }
            })
        })

        if (testCode(str, variablesArr)) {
            context.report({
                node: node.test,
                messageId: 'maybeInfiniteLoop'
            })
        }
      },
    };
}

module.exports = {
    create,
    meta: {
        type: "problem",
        docs: {
            description: "disallow easy infinite loop",
            category: "Possible Errors",
            recommended: true,
        },
        fixable: null,
        messages: {
            infiniteLoop: '⚠️ infinite loop',
            maybeInfiniteLoop: 'maybe an infinite loop'
        },
        schema: [] // no options
    },
};