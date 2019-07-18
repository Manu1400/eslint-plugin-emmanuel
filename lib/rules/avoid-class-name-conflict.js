'use strict';

const getDocsUrl = require('../util/getDocsUrl');

const addedTypes = require("../util/addedTypes.json") // from TSJS-lib-generator/inputfiles/addedTypes
const overridingTypes = require("../util/overridingTypes.json")
const { natives } = require("../util/natives.json")
// https://github.com/kgoe/node-tester/blob/9155c762eee8c4f2429a0c5ec9a46e43c2d0fe8d/test-disabled/map-properties.js
const chromeGlobals = require("../util/chromeGlobals.json")

const interfaces = Object.assign(
    addedTypes.interfaces.interface, 
    overridingTypes.interfaces.interface
)

const create = context => {
	return {
      /**
       * @param { ClassDeclaration } node
       */
    "ClassDeclaration[id.name]": node => {
        const className = node.id.name
        const regexPrefixes = /(WebKit|MS|DOM)/i

        const all = Object.keys(interfaces)
            .concat(natives)
            .concat(chromeGlobals)
            .concat(["MSCSSMatrix"])
            .map(key => key.toLowerCase())
        
        if (all.includes(className.toLowerCase())) {
            context.report({
                node: node.id,
                message: `redefine native ` + className,
            });
        } else if (regexPrefixes.test(className.toLowerCase())) {
            const [ namespacePrefix ] = className.match(regexPrefixes)
            context.report({
                node: node.id,
                message: `define native ${className} but namespace ${namespacePrefix} is used by native`,
            });
        }
    },
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			description: "avoid use a native name for a class name",
			url: getDocsUrl(__filename)
        },
        type: "problem",
	}
};
