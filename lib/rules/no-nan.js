'use strict';

const create = context => {
	const isDetected = function (tokens) {
		var a, b, c, d, e;
		[a, b, c, d, e] = tokens
		const boolA = (a.type == 'Identifier' && a.value == "document")
		const boolB = (b.type == 'Punctuator' && b.value == ".")
		const boolC = (c.type == 'Identifier' && c.value == "location")
		const boolD = (d.type == 'Punctuator' && d.value == ".")
		const boolE = (e.type == 'Identifier' && e.value == "href")
		return (boolA && boolB && boolC && boolD && boolE)
	}

	const isDetected2 = function (tokens, report, node) {
		tokens.forEach(function (token, index) {
			//TODO: rewite this part
			if (token.type == 'Identifier' && token.value == "document") {
				if (tokens[index+1].type == "Punctuator" && tokens[index+1].value == ".") {
					if (tokens[index+2].type == 'Identifier' && tokens[index+2].value == "location") {
						if (tokens[index+3].type == "Punctuator" && tokens[index+3].value == ".") {
							if (tokens[index+4].type == 'Identifier' && tokens[index+4].value == "href") {
								report({
									node,
									loc: token.loc,
									message: `"document.location.href" detected`
								});
							}
						}
					}
				}
			}
		})
	}

	return {
		'AssignmentExpression[operator=\'=\'][left.type=\'Identifier\'][left.name=\'NaN\']': node => {
			context.report({
				node,
				message: `Don't try to assign value to NaN`
			});
		},
		'AssignmentExpression[operator=\'=\'][left.property.name=\'length\'][left.type=\'MemberExpression\'][left.object.type=\'Identifier\'][left.object.name=\'history\']': node => {
			context.report({
				node,
				message: `Don't try to assign value to history.length`
			});
		},
		'AssignmentExpression[operator=\'=\'][left.property.name=\'visible\'][left.type=\'MemberExpression\'][left.object.type=\'Identifier\'][left.object.name=\'locationbar\']': node => {
			context.report({
				node,
				message: `Don't try to assign value to locationbar.visible`
			});
		},
		// warn
		'AssignmentExpression[operator=\'=\'][left.property.name=\'length\'][left.type=\'MemberExpression\'][left.object.type=\'Identifier\'][left.object.name=\'window\']': node => {
			context.report({
				node,
				message: `Don't try to assign value to window.length`
			});
		},
		'Identifier[name=\'closed\']': node => {
			context.report({
				node,
				message: `Tips: avoid variable or constant named 'closed' because it's already used in browsers`
			});
		},
		// avoid close()
		// old: [type=\'Identifier\'][name=\'close\']
		// TODO: rewrite rule for perf ?
		'Identifier[name=\'close\'][parent.type=\'CallExpression\']': node => {
			context.report({
				node,
				message: `avoid close(): on browser console you have "Scripts may close only the windows that were opened by it."`
			});
		},
		'AssignmentExpression[operator=\'+=\'][left.type=\'MemberExpression\'][right.type=\'Literal\'][left.object][right.value]': node => {
			//isDetected2(node.parent.parent.tokens, context.report, node)
			if (isDetected(node.parent.parent.tokens)) {
				context.report({
					node,
					message: `avoid edit hash with document.location.href`, // for avoid http://perdu.com/#0000d#href
					fix: function(fixer) {
						const hash = node.right.value.replace("#", "")
				    return fixer.replaceText(node, `document.location.hash = '${hash}'`)
				  }
				});
			}
		},
		//'[tokens]': node => {
		//	isDetected2(node.tokens, context.report, node)
		//},
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			//url: getDocsUrl(__filename)
			description: "Don't try to assign value to readonly items"
		},
		fixable: 'code'
	}
};
