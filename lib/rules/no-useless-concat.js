/**
 * @fileoverview disallow unncessary concatenation of template strings
 * @author Henry Zhu
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const {isStringLiteral, isTokenOnSameLine} = require("../util/ast-utils");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Checks whether or not a given node is a concatenation.
 * @param {ASTNode} node - A node to check.
 * @returns {boolean} `true` if the node is a concatenation.
 */
function isConcatenation(node) {
    return node.type === "BinaryExpression" && node.operator === "+";
}

/**
 * Checks if the given token is a `+` token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a `+` token.
 */
function isConcatOperatorToken(token) {
    return token.value === "+" && token.type === "Punctuator";
}

/**
 * Get's the right most node on the left side of a BinaryExpression with + operator.
 * @param {ASTNode} node - A BinaryExpression node to check.
 * @returns {ASTNode} node
 */
function getLeft(node) {
    let left = node.left;

    while (isConcatenation(left)) {
        left = left.right;
    }
    return left;
}

/**
 * Get's the left most node on the right side of a BinaryExpression with + operator.
 * @param {ASTNode} node - A BinaryExpression node to check.
 * @returns {ASTNode} node
 */
function getRight(node) {
    let right = node.right;

    while (isConcatenation(right)) {
        right = right.left;
    }
    return right;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow unnecessary concatenation of literals or template literals",
            category: "Best Practices",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-useless-concat"
        },

        fixable: 'code',

        schema: []
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        return {
            BinaryExpression(node) {

                // check if not concatenation
                if (node.operator !== "+") {
                    return;
                }

                // account for the `foo + "a" + "b"` case
                const left = getLeft(node);
                const right = getRight(node);

                if (isStringLiteral(left) &&
                    isStringLiteral(right) &&
                    isTokenOnSameLine(left, right)
                ) {
                    const operatorToken = sourceCode.getFirstTokenBetween(left, right, isConcatOperatorToken);

                    const leftRaw = left.type == 'TemplateLiteral' ? left.quasis[0].value.cooked : left.value
                    const rigthRaw = right.type == 'TemplateLiteral' ? right.quasis[0].value.cooked : right.value

                    const regexAZ = /[a-z]/g
                    if (left.type != right.type) {
                      if (leftRaw.search(regexAZ) == -1 || rigthRaw.search(regexAZ) == -1) {
                        return;
                      }
                    }

                    // ? https://github.com/PsukheDelos/silverstripe-visual/blob/18716b2871c16285d18654fa4a4f674f3d04ad02/jspm_packages/npm/jstransform%4010.1.0/visitors/es6-template-visitors.js
                    if (left.expressions && left.expressions.length) {
                      return;
                    }
                    if (right.expressions && right.expressions.length) {
                      return;
                    }

                    context.report({
                        node,
                        loc: operatorToken.loc.start,
                        message: "Unexpected string concatenation of literals.",
                        fix: function(fixer) {
                          return fixer.replaceText(node, JSON.stringify(leftRaw + rigthRaw))
                        }
                    });
                }
            }
        };
    }
};
