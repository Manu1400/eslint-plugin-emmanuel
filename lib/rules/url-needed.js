'use strict';

const isUrl = require("is-url")

const isUrlAll = function (value) {
  var bool
  try {
    new URL(value)
    bool = true
  } catch (e) {
    bool = false
  }
  return bool
}

const create = context => {
	return {
		"VariableDeclarator[id.name=/URL/][init.type=\"Literal\"]": node => {
      const urlValue = node.init.value
      if (isUrlAll(urlValue)) {
        if (isUrl(urlValue)) {
          var objUrl = new URL(urlValue)
          //TODO: add https://github.com/keyfoxth/eslint-plugin-url/blob/HEAD/docs/rules/no-http.md
          if (objUrl.hash != "") {
            context.report({
              node,
              message: 'Look like to need an URL and this URL has a useless hash'
              // for fixer:
              // url.hash = ''
            });
          }
        }
        return;
      }
      context.report({
        node,
        message: 'Look like to need an URL and it is not an URL'
      });
      //TODO: add https://flaviocopes.com/how-to-check-if-file-exists-node/
    },
    "AssignmentPattern[left.name=/URL/][right.value]": node => {
      if (node.right.value == "") {
        context.report({
          node,
          message: 'Look like to need an URL, avoid empty default value for URL'
        });
      }
    }
	};
};

module.exports = {
	create,
	meta: {
		docs: {
			description: "is URL"
			//url: getDocsUrl(__filename)
		},
    fixable: 'code',
	}
};
