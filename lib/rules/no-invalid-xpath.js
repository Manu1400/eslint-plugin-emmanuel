'use strict';

//const select = require('xpath.js')
// or ts-xpath: https://www.npmjs.com/package/ts-xpath

const jsXpath = require("js-xpath")

// https://developer.mozilla.org/fr/docs/Web/API/XPathResult#Constants
const XPathResult = {
	ANY_TYPE: 0,
	NUMBER_TYPE: 1,
	STRING_TYPE: 2,
	BOOLEAN_TYPE: 3,
	UNORDERED_NODE_ITERATOR_TYPE: 4,
	ORDERED_NODE_ITERATOR_TYPE: 5,
	UNORDERED_NODE_SNAPSHOT_TYPE: 6,
	ORDERED_NODE_SNAPSHOT_TYPE: 7,
	ANY_UNORDERED_NODE_TYPE: 8,
	FIRST_ORDERED_NODE_TYPE: 9
}

const create = context => {
	return {
		'CallExpression[callee.object.name=\'document\'][callee.property.name=\'evaluate\'][arguments.length > 0]': node => {
			const xpathExpression = node.arguments[0].value

			if (xpathExpression.length > 100) {
				context.report({node, message: "large XPath expression detected"})
			}
			
			try {
				//	select([], xpathExpression)
				jsXpath.parse(xpathExpression)
			} catch (error) {
				//	//TODO: add xpath value
				//	console.log(error)
				context.report({node, message: "invalid XPath: " + "Unrecognized text"})
				return;
			} 

			const parsed = jsXpath.parse(xpathExpression)
			var regenerated = parsed.toXPath();
			if (xpathExpression !== regenerated) {
				context.report({node, message: "XPath expression lisibility: " + regenerated})
			}

			// an other rule:

			if (node.arguments.length >= 4) {
				if (node.arguments[3].type == 'Literal') {
					const valueToReplace = node.arguments[3].value // 0
					context.report({
						node,
						message: "avoid magic number: {{valueToReplace}} 0 -> XPathResult.ANY_TYPE",
						fix: function(fixer) {
							let str
							// TODO: use Object.keys ?
							switch (node.arguments[3].value) {
								case XPathResult.ANY_TYPE:
									str = 'XPathResult.ANY_TYPE'
									break;
								case XPathResult.ANY_UNORDERED_NODE_TYPE:
									str = 'XPathResult.ANY_UNORDERED_NODE_TYPE'
								break;
								default:
									str = ""
								break;
							}
							if (str.length)
								return fixer.replaceText(node.arguments[3], str)
						}
					})
				}
			}
		}
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			//url: getDocsUrl(__filename)
			description: "Check XPath expressions and avoid magic number"
		},
		fixable: "code"
	}
};
