/**
 * @fileoverview Find require() or require("")
 * @author Emmanuel
 */
"use strict";

module.exports = {
    meta: {
        docs: {
            description: "Detect if require() is redefine",
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
          //var value = ''
          if (body.declarations && body.declarations[0]) {
            if (body.declarations[0].init.callee && body.declarations[0].init.callee.name == 'require') {
              if (body.declarations[0].init.arguments.length == 0 || body.declarations[0].init.arguments[0].value == '') {
                context.report({
                  node: node.body[0] ? node.body[0] : node,
                  message: 'Fill me in.'
                });
              }
            }
          }
        })
      }

      return {
        'Program:exit': (node) => {
          checkExportPresence(node);
        },
      };
    },
};
