/**
 * @fileoverview Detect if require() is redefine
 * @author Emmanuel
 */
"use strict";

const create = context => {
  return {
    'VariableDeclarator[id.name="require"]': node => {
      context.report({
        node,
        message: 'require redefined'
      });
    }
  }
}

module.exports = {
  create,
    meta: {
        docs: {
            description: "Detect if require() is redefine",
            recommended: true
        },
        fixable: null,
        schema: [
        ]
    }
}
