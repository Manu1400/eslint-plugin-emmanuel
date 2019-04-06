'use strict';

const create = context => {
  //var sourceCode = context.getSourceCode();

	return {
    //TODO: Math.log(10) -> Math.LN10
    //TODO: Math.log(2) -> Math.LN2
    //TODO: Math.sqrt(.5) -> Math.SQRT1_2
		'CallExpression[callee.object.name=\'Math\'][callee.property.name=\'exp\']': node => {
      const [ firstArgument ] = node.arguments

      if (node.arguments.length != 1) {
        return;
      }

      //TODO: Math.exp(0) -> 1

      if (firstArgument.value == 1) {
        context.report({
          node,
          message: `Math.exp(1) -> Math.E`,
          fix: function(fixer) {
            return fixer.replaceText(node, 'Math.E')
          }
        });
      }
    },
    // https://github.com/josdejong/mathjs
    'CallExpression[callee.object.name=\'math\'][callee.property.name=\'eval\']': node => {
      const [ firstArgument ] = node.arguments


      if (node.arguments.length != 1) {
        return;
      }

      if (firstArgument.value == "exp(1)") {
        // get all source
        //var source = sourceCode.getText();

        context.report({
          node,
          message: `math.eval('exp(1)') -> math.eval('e') -> Math.E`,
          fix: function(fixer) {
            return fixer.replaceText(node, "Math.E")
          }
        });
      }
    },
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			description: "use Math constants"
			//url: getDocsUrl(__filename)
		},
		fixable: 'code'
	}
};
