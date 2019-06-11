const create = function (context) {
    const sourceCode = context.getSourceCode()
    const comments = sourceCode.getAllComments()

    return {
      'Program': node => { //'*'
        // eslint-disable-next-line no-magic-numbers
        const maxComments = context.options[0] || 10
        
        //can fix this by an option
        if (comments.length >= maxComments) {
          context.report({
            node: comments[0],
            message: 'too many comments in this file with {{ nbComments }} comments',
            // eslint-disable-next-line id-blacklist
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
        description: ""
      },
      schema: [
        {
            "type": "number",
            "minimum": 0,
            "multipleOf" : 1
        }
      ]
    }
}