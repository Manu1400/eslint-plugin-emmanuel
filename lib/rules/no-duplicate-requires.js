/**
 * @fileoverview eslint-plugin-import offer a rule to report when a resolved path is imported more than once, but that doesn't work with require
 * @author Emmanuel
 */
const {dirname, normalize} = require('path')

const remplace = function(str = "") {
  var value = str;

  value = value.replace('//', '/') // Mac OS
  value = value.replace('.json', '')
  value = value.replace('.js', '')

  return value;
} 

/* eslint-disable no-restricted-syntax */

const create = function (context) {
  const checkExportPresence = (node) => {
    const arr = [];

    // eslint-disable-next-line max-statements
    node.body.forEach((body) => {
      var value = ''
      if (body.declarations && body.declarations[0] && typeof body.declarations[0].init == "object") {
        if (body.declarations[0].init.callee.name == 'require' && body.declarations[0].init.arguments[0].value) {
          value = remplace(body.declarations[0].init.arguments[0].value)
          if (dirname(value) != '.') {
            value = dirname(value)
          }

          if (arr.includes(value)) {
            context.report({
              node: node.body[0] ? node.body[0] : node,
              message: 'duplicate require'
            });
          } else {
            arr.push(value);
          }
        }
      }
      if (body.expression) {
        if (body.expression.arguments && body.expression.arguments[0] && typeof body.expression.callee.name == "string") {
          if (body.expression.callee.name == 'require' && body.expression.arguments[0].value) {

            value = body.expression.arguments[0].value.replace('.json', '');
            value = value.replace('.js', '')
            value = normalize(value)

            if (arr.includes(value)) {
              context.report({
                node: node.body[0] ? node.body[0] : node,
                message: 'duplicate require'
              });
            } else {
              arr.push(value);
            }
          }
        }
      }
    });
  };

  return {
    'Program:exit': (node) => {
      checkExportPresence(node);
    },
  };
}

module.exports = {
  create,
  meta: {
    docs: {
      description: "eslint-plugin-import offer a rule to report when a resolved path is imported more than once, but that doesn't work with require",
      recommended: false, //TODO: update README
    },
    fixable: null,
    schema: [
    ],
  },
}
