'use strict';

const create = context => {
	return {
		'Literal[value]': node => {
			var message;
			switch (node.value) {
				case Number.EPSILON: // ES6
					message = "Number.EPSILON";
					break;
				// Number.MIN_SAFE_INTEGER
				// Number.MAX_SAFE_INTEGER
				case Math.E:
					message = "Math.E";
					break;
				case Math.LN10:
					message = "Math.LN10";
					break;
				case Math.LOG10E:
					message = "Math.LOG10E";
					break;
				case Math.PI:
					message = "Math.PI";
					break;
				case Math.PI/2:
					message = "(Math.PI/2)";
					break;
					//case Math.PI/180:
					//	message = "(Math.PI/180)";
					//	break;
				case Math.SQRT1_2:
					message = "Math.SQRT1_2";
					break;
				case Math.SQRT2:
					message = "Math.SQRT2";
					break;
				case Math.tan(1):
					message = "(Math.tan(1))";
					break;
				default:
					message = "";
					break;
			}
			if (message != "") {
				context.report({node,
					message: message + " detected",
					fix: function(fixer) {
				    return fixer.replaceText(node, message)
				  }
				});
			}
		}
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			//url: getDocsUrl(__filename)
			description: "prefer to use a standart Math constant"
		},
		fixable: 'code'
	}
};
