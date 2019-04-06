'use strict';

const create = context => {
	return {
		'BinaryExpression[operator="/"][right.value=0]': node => {
      var message = "Divide by zero"
      context.report(node.right, message);
		},
    'BinaryExpression[operator="/"][right.type="Identifier"]': node => {
      if (node.right.name === 'ZERO') {
        context.report(node.right, "maybe a divide by -zero, please rename variable ZERO");
        return;
      }
      console.log({name: node.right.name})
      var sourceCode = context.getSourceCode();
      console.log(sourceCode.getText(node))

      //console.log(context.getScope())
      console.log(context.getDeclaredVariables())
      //console.log(node)
    },
    'BinaryExpression[operator="/"][right.type="UnaryExpression"][right.operator][right.argument]': node => {
      //console.log({"argument": node.right.argument})
      if (node.right.operator == "+") {
        context.report(node.right, "Divide by +zero");
      }
      if (node.right.operator == "-") {
        context.report(node.right, "Divide by -zero");
      }
    },
    'BinaryExpression[operator="/"][right.type="AssignmentExpression"][right.right.value=0]': node => {
      //var sourceCode = context.getSourceCode();
      //console.log({getText: sourceCode.getText(node)})

      //console.log(node.right.right)
      context.report(node.right, "Look like divide by zero");
    },
    'BinaryExpression[operator="/"][right.type="Literal"][right.value=false]': node => {
      context.report(node.right, "Divide by false");
    },
    'BinaryExpression[operator="/"][right.type="BinaryExpression"][right.left.value=0]': node => {
      if (node.right.operator == "/") {
        context.report(node.right, "look like to divide by result 0");
      }
      if (node.right.operator == "+" && node.right.right.value === 0) {
        context.report(node.right, "look like to divide by result 0 (0+0)");
      }
    },
    'BinaryExpression[operator="/"][right.type="BinaryExpression"][right.left.value]': node => {
      if (node.right.operator == "-") {
        if (node.right.right.value === node.right.left.value) {
          context.report(node.right, "look like to divide by result 0 (samevalue - samevalue)");
        }
      }
    },
    'BinaryExpression[operator="-"][left.type="Identifier"][right.type="Identifier"][left.name][right.name]': node => {
      if (node.left.name === node.right.name) {
        context.report(node.right, "useless code (variable-same_variable)");
      }
    },
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			//url: getDocsUrl(__filename)
			description: "No divide by zero" 
		},
	}
};
