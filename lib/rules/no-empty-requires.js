/**
 * @fileoverview Find require() or require("")
 * @author Emmanuel
 */
"use strict";

const create = context => {
  return {
    'CallExpression[callee.name="require"][arguments.0.type="Literal"][arguments.0.value]': node => {
      if (node.arguments[0].value.trim() === '') {
        context.report({
          node,
          message: 'empty require'
        });
      }
    },
    'CallExpression[callee.name="require"][arguments]': node => {
      if (node.arguments.length == 0) {
        context.report({
          node,
          message: 'empty require'
        });
      }
    },
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: "Find require() or require(\"\")",
      recommended: true
    },
    fixable: null,
    schema: [
    ]
  }
}
