/**
 * @fileoverview eslint-plugin-import offer a rule to report when a resolved path is imported more than once, but that doesn't work with require
 * @author Emmauel
 */


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
        if (body.declarations && body.declarations[0]) {
          if (body.declarations[0].init.callee.name == 'require') {
            // context.report(node.body[0] ? node.body[0] : node, 'Fill me in.')
            // context.report(node.body[0] ? node.body[0] : node, 'Other issue with file require.')

            // TODO: better code for remove '.js'
            value = body.declarations[0].init.arguments[0].value.replace('.js', '');
            if (arr.includes(value)) {
              context.report(node.body[0] ? node.body[0] : node, 'Fill me in.');
            } else {
              arr.push(value);
            }
          }
        }
        if (body.expression) {
          if (body.expression.arguments[0]) {
            if (body.expression.callee.name == 'require') {
              value = body.expression.arguments[0].value.replace('.js', '');
              if (arr.includes(value) || arr.includes(`${value}.js`)) {
                context.report(node.body[0] ? node.body[0] : node, 'Fill me in.');
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
