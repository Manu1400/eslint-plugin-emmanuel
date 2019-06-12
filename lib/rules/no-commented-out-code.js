const { parse } = require('espree');

const isSingleWord = function (text) {
  return /^[\w-]*$/.test(text);
}

const isValidCode = function (text, MAX_LENGTH = 10) {
  if (text.length <= MAX_LENGTH) {
    return false
  }

  if (text === " $FlowFixMe" || isSingleWord(text) ) {
    return false;
  }
  if (/^\$FlowFixMe/.test(text) || /^\$FlowTODO/.test(text)) {
    return false
  }
  // ie. eslint-disable-next-line
  if (/^ ?eslint-/.test(text)) {
    return false
  }

  try {
    const ast = parse(text, {
      ecmaVersion: 6,
    });
    return Boolean(ast);
  } catch (error) {
    return false;
  }
}

const create = function (context) {
  const sourceCode = context.getSourceCode()
  const comments = sourceCode.getAllComments()

  return {
    'Program': node => {
      comments.forEach(function (comment) {
        if (isValidCode(comment.value)) {
          context.report({
            node: comments[0],
            message: 'commented out code ',
            // eslint-disable-next-line id-blacklist
            data: {
              nbComments: comments.length
            }
          })
        }
      })
    },
  }
}

module.exports = {
  create,
  meta: {
    docs: {
      description: "Detect commented code"
    },
  }
}