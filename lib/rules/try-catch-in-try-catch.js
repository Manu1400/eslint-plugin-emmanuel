const getDocsUrl = require('../util/getDocsUrl');

const create = function (context) {
    return {
      /**
       * @type {Function}
       * @param {TryStatement} node
       */
      'TryStatement TryStatement': node => {
        context.report({
            node,
            message: 'try in try',
        })
      },
    }
  }

module.exports = {
    create,
    meta: {
      type: 'problem',
      docs: {
        description: "..",
        url: getDocsUrl(__filename),
      },
      schema: []
    }
}