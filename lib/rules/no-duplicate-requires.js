/**
 * @fileoverview eslint-plugin-import offer a rule to report when a resolved path is imported more than once, but that doesn't work with require
 * @author Emmanuel
 */
const {dirname, normalize} = require('path')

/* eslint-disable-next-line no-restricted-properties */
const extensions = Object.keys(require.extensions)

//------------------------------------------------------------------------------
// Rule Definition
//-------------------------- ----------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "eslint-plugin-import offer a rule to report when a resolved path is imported more than once, but that doesn't work with require",
      category: 'Fill me in',
      recommended: true,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    const checkExportPresence = (node) => {
      const arr = [];

      node.body.forEach((body) => {
        var value = ''
        if (body.declarations && body.declarations[0] && typeof body.declarations[0].init == "object") {
          if (body.declarations[0].init.callee.name == 'require' && body.declarations[0].init.arguments[0].value) {
            value = body.declarations[0].init.arguments[0].value
            // if (value.indexOf('./') == 0) {
              value = value.replace('//', '/') // MacOS
              //value = path.normalize(value)

              //TODO: Please, test.json.js
              value = value.replace('.json', '')
              value = value.replace('.js', '')
              //if (extensions.includes(path.extname(value))) {
                // remove extension
                //value = path.dirname(value)
              //}
            // }
            //value = value.replace('/submodule', "")
            value = dirname(value) == '.' ? value : dirname(value)
            if (arr.includes(value)) {
              context.report({
                node: node.body[0] ? node.body[0] : node,
                message: 'Fill me in.'
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
                  message: 'Fill me in.'
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

      // give me methods
      'Program:exit': (node) => {
        // updateExportUsage(node)
        // updateImportUsage(node)
        checkExportPresence(node);
      },
    };
  },
};
