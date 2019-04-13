'use strict';

const create = context => {
	return {
		"FunctionDeclaration[id.name] VariableDeclarator[id.name]": node => {
      const functionName = node.id.name;

      if (functionName != node.parent.parent.parent.id.name) {
        return;
      }
        context.report({
          node,
          message: `valid but see https://gist.github.com/bakkot/24c28836580a94989084`,
        });
      }
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			description: "TODO"
			//url: getDocsUrl(__filename)
		},
		fixable: 'code'
	}
};
