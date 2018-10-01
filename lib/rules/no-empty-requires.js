/**
 * @fileoverview Find require() or require("")
 * @author Emmanuel
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Find require() or require(\"\")",
            category: "Fill me in",
            recommended: true
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
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
        node.body.forEach((body) => {
          var value = ''
          if (body.declarations && body.declarations[0]) {
            if (body.declarations[0].init.callee && body.declarations[0].init.callee.name == 'require') {
              if (body.declarations[0].init.arguments.length == 0 || body.declarations[0].init.arguments[0].value == '') {
                context.report(node.body[0] ? node.body[0] : node, 'Fill me in.');
              }
            }
          }
          if (body.expression) {
            if (body.expression.callee && body.expression.callee.name == 'require') {
              if (body.expression.arguments.length == 0 || body.expression.arguments[0].value == '') {
                context.report(node.body[0] ? node.body[0] : node, 'Fill me in.');
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
