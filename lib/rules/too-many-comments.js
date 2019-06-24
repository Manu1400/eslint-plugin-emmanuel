const getDocsUrl = require('../util/getDocsUrl');

const schema = [
  {
      "type": "number",
      "minimum": 0,
      "multipleOf" : 1,
      "default": 10
  }
]

// eslint-disable-next-line no-magic-numbers
const getMaxComments = function (maxComments = schema[0].default) {
  return maxComments;
}

const create = function (context) {
    const sourceCode = context.getSourceCode()
    const comments = sourceCode.getAllComments()

    return {
      'Program': node => { //'*'
        const maxComments = getMaxComments(context.options[0])
        
        if (comments.length > maxComments) {
          context.report({
            node: comments[0],
            message: 'too many comments in this file with {{ nbComments }} comments',
            data: {
              nbComments: comments.length
            }
          })
        }
      },
    }
  }

module.exports = {
    create,
    meta: {
      // type: 'suggestion',
      docs: {
        description: "..",
        url: getDocsUrl(__filename),
      },
      schema
    }
}