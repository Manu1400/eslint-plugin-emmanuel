'use strict';

//const select = require('xpath.js')
// or ts-xpath: https://www.npmjs.com/package/ts-xpath

const jsXpath = require("js-xpath")
const XPathAnalyzer = require("xpath-analyzer").default;
const isEqual = require('lodash.isequal');

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
	const checkInvalidIndex = function (obj, report, node) {
		for (step in obj.steps) {
			var step = obj.steps[step]
			try {
			const type = step.predicates[0].type
			if (type == "number") {
				const number = step.predicates[0].number
				if (number == 0) {
					report({node, message: "invalid index: " + number})
				}
			}
			} catch (error) {
				if (error.name !== 'TypeError') {
					console.error("Message: ", error.message);
				}
			}
		}
	}

	const checkLang = function (obj, report, node) {
		const bcp47Validate = require("bcp47-validate").validate
		
		for (step in obj.steps) {
			var step = obj.steps[step]
			try {
			const name = step.predicates[0].lhs.steps[0].test.name
			if (name == "lang") {
				const lang = step.predicates[0].rhs.string
				if (bcp47Validate(lang) == false) {
					report({node, message: "invalid @lang: " + lang})
				}
			}
			} catch (error) {
				if (error.name !== 'TypeError') {
					console.error("Message: ", error.message);
				}
			}
		}
	}

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
					//console.log(error)
				context.report({node, message: "invalid XPath: " + "Unrecognized text"})
				return;
			} 

			const parsed = jsXpath.parse(xpathExpression)
			const regenerated = parsed.toXPath();
			if (xpathExpression !== regenerated) {
				context.report({node, message: "XPath expression lisibility: " + regenerated})
			}

			try {
				var analyzer = new XPathAnalyzer(xpathExpression);
				var obj = analyzer.parse();
			} catch (error) {
				context.report({node, message: "invalid XPath"})
				return;
			}
			var analyzer = new XPathAnalyzer(xpathExpression);
			var obj = analyzer.parse();
			if (obj.steps && obj.steps.length >= 2 && obj.steps[1].predicates) {
				const predicates = obj.steps[1].predicates
				if (predicates.length >= 2 && isEqual(predicates[1], predicates[0])) {
					context.report({node, message: "XPath expression: duplicate predicate"})
				}
			}

			checkLang(obj, context.report, node)

			checkInvalidIndex(obj, context.report, node)

			if (typeof obj.lhs == "object" && typeof obj.rhs == "object") {
				if (isEqual(obj.lhs, obj.rhs) && obj.type === "union") {
					context.report({node, message: "same expression"})
				}
			}


			// TODO: create an other rule no-magic-number-about-xpath (by moving code)

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
