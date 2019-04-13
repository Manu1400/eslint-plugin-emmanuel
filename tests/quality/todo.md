      {
          "selector": "BinaryExpression[operator=instanceof][right.name=Array]",
          "message": "`instanceof Array` is disallowed. Prefer `Array.isArray()`."
      },
      {
        "selector": "BinaryExpression[operator=\"===\"][right.name=undefined]",
        "message": "prefer compare to void 0, see http://eamodeorubio.github.io/thejshorrorshow/#/33"
      },

// code issue:

const isValidCode = function (text) {
  if (isSingleWord(text)) { // || isJshint(text)
    return false;
  }
  // string used to disable Flow typing for the next line
  if (text.trim() === "$FlowFixMe") {
    return false
  }
}