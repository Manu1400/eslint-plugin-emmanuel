const create = function (context) {
    const sourceCode = context.getSourceCode()
    //TODO: use  getCommentsInside()
    const comments = sourceCode.getAllComments()

    return {
      'Program': node => { //'*'
        //TODO: option
        if (comments.length >= 10) {
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
    }
}