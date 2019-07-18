'use strict';

const getDocsUrl = require('../util/getDocsUrl');

const create = context => {
	return {
    /**
     * @param { BinaryExpression } node
     */
		'BinaryExpression[operator="/"][right.value=0]': node => {
      context.report(node.right, "Divide by zero");
    },
    /**
     * @param { BinaryExpression } node
     */
    'BinaryExpression[operator="/"][right.type="Identifier"][right.name="ZERO"]': node => {
      context.report(node.right, "maybe a divide by -zero, please rename variable ZERO");
    },
    /**
     * @param { BinaryExpression & {right: UnaryExpression} } node
     */
    'BinaryExpression[operator="/"][right.type="UnaryExpression"][right.operator][right.argument]': node => {
      if (node.right.operator == "+") {
        context.report(node.right, "Divide by +zero");
      }
      if (node.right.operator == "-") {
        context.report(node.right, "Divide by -zero");
      }
    },
    /**
     * @param { BinaryExpression } node
     */
    'BinaryExpression[operator="/"][right.type="AssignmentExpression"][right.right.value=0]': node => {
      context.report(node.right, "Look like divide by zero");
    },
    /**
     * @param { BinaryExpression } node
     */
    'BinaryExpression[operator="/"][right.type="Literal"][right.value=false]': node => {
      context.report(node.right, "Divide by false");
    },
    /**
     * @param { BinaryExpression & {right: BinaryExpression} } node
     */
    'BinaryExpression[operator="/"][right.type="BinaryExpression"][right.left.value=0]': node => {
      if (node.right.operator == "/") {
        context.report(node.right, "look like to divide by result 0");
      }
      if (node.right.operator == "+" && node.right.right.value === 0) {
        context.report(node.right, "look like to divide by result 0 (0+0)");
      }
    },
    /**
     * @param { BinaryExpression & {right: BinaryExpression} } node
     */
    'BinaryExpression[operator="/"][right.type="BinaryExpression"][right.left.value][right.operator="-"]': node => {
      if (node.right.right.value === node.right.left.value) {
        context.report(node.right, "look like to divide by result 0 (samevalue - samevalue)");
      }
    },
    /**
     * @param { BinaryExpression & {left: Identifier} & {right: Identifier} } node
     */
    'BinaryExpression[operator="-"][left.type="Identifier"][right.type="Identifier"]': node => {
      if (node.left.name === node.right.name) {
        context.report({
          node,
          message: "useless code (variable-same_variable)"
        })
      }
    },
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			url: getDocsUrl(__filename),
			description: "No divide by zero"
		},
	}
};
