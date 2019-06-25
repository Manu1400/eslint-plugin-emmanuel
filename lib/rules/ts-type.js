'use strict';

const getDocsUrl = require('../util/getDocsUrl');
const dlv = require('dlv')

const create = context => {
	return {
        "FunctionDeclaration[id.name][params.length=0]": (node) => {
            const fnName = node.id.name
            const regex = /(display[A-Z].+)|find/m
            // TODO: move this as a javascript rule, because it can use this.user
            if (regex.test(fnName)) {
                context.report({
                    node,
                    message: 'param missing'
                })
            }
        },
        "FunctionDeclaration[id.name][body]:not([returnType])": (node) => {
            const fnName = node.id.name
            const regex = /(warn[A-Z].+|display)/m
            if (regex.test(fnName)) {
                context.report({
                    node,
                    message: 'missing `: void`',
                    fix: function(fixer) {
                        return fixer.insertTextBefore(node.body, ": void ")
                    }
                })
            }
        },
        "FunctionDeclaration[id.name='getRandomStr'][returnType]": (node) => {
            //const fnName = node.id.name
            const type = dlv(node.returnType, 'typeAnnotation.type')
            if (type === 'TSNumberKeyword') {
                context.report({
                    node: node.returnType,
                    message: 'returnType incorrect',
                })
            }
        },
        "FunctionDeclaration[params]": (node) => {
            node.params.forEach(function (param) {
                // param.typeAnnotation.typeAnnotation.type
                const type = dlv(param, 'typeAnnotation.typeAnnotation.type')
                const regexIs = /is[A-Z].+/m
                if (regexIs.test(param.name)) {
                    if (typeof type === "undefined") {
                        context.report({
                            node: param,
                            message: `missing type`,
                            fix: function(fixer) {
                                return fixer.insertTextAfter(param, " : boolean")
                            }
                        })
                    } else if (type !== "TSBooleanKeyword") { // `t.isTSBooleanKeyword(node, opts)` in @babel/types
                        context.report({
                            node: param,
                            message: `type error`
                        })
                    }
                }
                // eslint-disable-next-line no-restricted-syntax
                const regexList = /list/m
                if (regexList.test(param.name)) {
                    if (typeof type === "undefined") {
                        context.report({
                            node: param,
                            message: `missing type`,
                            fix: function(fixer) {
                                return fixer.insertTextAfter(param, " : any[]")
                            }
                        })
                    }
                }
                const regexStr = /str/m
                if (regexStr.test(param.name)) {
                    if (typeof type === "undefined") {
                        context.report({
                            node: param,
                            message: `missing type`,
                            fix: function(fixer) {
                                return fixer.insertTextAfter(param, " : string")
                            }
                        })
                    }
                }

            })
        },
	}
};

module.exports = {
	create,
	meta: {
		docs: {
            description: "..",
            url: getDocsUrl(__filename)
        },
        fixable: `code`,
		schema: []
	}
};
