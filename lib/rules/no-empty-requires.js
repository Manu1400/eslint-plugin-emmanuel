/**
 * @fileoverview Find require() or require("")
 * @author Emmanuel
 */
"use strict";

const getDocsUrl = require('../util/getDocsUrl');

/**
 * @param { Context } context
 */
const create = context => {
  return {
    /**
     * @param { CallExpression & {arguments: Array<SimpleLiteral>} } node
     */
    'CallExpression[callee.name="require"][arguments.0.type="Literal"][arguments.0.value]': node => {
      if (typeof node.arguments[0].value == 'string' && node.arguments[0].value.trim() === '') {
        context.report({
          node,
          message: 'empty require'
        });
      }
    },
    /**
     * @param { CallExpression } node
     */
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
      description: `Find require() or require("")`,
      url: getDocsUrl(__filename),
      recommended: true
    },
    schema: []
  }
}
