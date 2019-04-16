/**
 * from https://github.com/bahmutov/eslint-rules
*/
const { parse } = require('espree');
const quote = require('quote');

//function isJshint(text) {
//  return /^jshint\ /.test(text);
//}

const isSingleWord = function (text) {
  return /^[\w-]*$/.test(text);
}

const isValidCode = function (text) {
  if (isSingleWord(text)) { // || isJshint(text)
    return false;
  }
  // string used to disable Flow typing for the next line
  if (text.trim() === "$FlowFixMe") { //TODO: add this string as a new option
    return false
  }
  // $FlowFixMe: suppressing this error until we can refactor
  if (/^\$FlowFixMe/.test(text)) {
    return false
  }
  if (/^\$FlowTODO/.test(text)) {
    return false
  }
  //todo: read .flowconfig file
  // see https://flow.org/en/docs/config/options/#suppress_comment-regex-

  //TODO: put max length value as option, in rule "no-commented-out-code"
  const MAX_LENGTH = 10
  //if (text.length <= MAX_LENGTH) {
  //  return false
  //}

  //TODO: put this as an rule option
  const options = {
    ecmaVersion: 6,
  }

  try {
    const ast = parse(text, options);
    // check EmptyStatement -> if EmptyStatement exist return false
    return Boolean(ast);
  } catch (err) {
    //console.error(err)
    return false;
  }
}

const firstLine = function (str) {
  return str.split('\n')[0];
}

const cutStr = function (str) {
  const MAX_LENGTH = 20;

  var line = firstLine(str);
  if (line.length > MAX_LENGTH) {
    line = line.substr(0, MAX_LENGTH) + ' ...';
  }
  return line;
}

/**
 * @return array
 */
const getCommentsWithCode = function(context) {
  // deprecated:  Use sourceCode.getAllComments() instead.
  var comments = context.getAllComments();

  //TODO: array -> use map ?
  //TODO: can move to a function
  // eslint-disable-next-line no-useless-assign/no-useless-assign
  comments = comments.filter(function (comment) {
    return isValidCode(comment.value.trim());
  })
  return comments
}

module.exports = function (context) {
  const comments = getCommentsWithCode(context)
  
  comments.forEach(function (commentedCode) {
    const code = cutStr(commentedCode.value.trim()); //TODO: duplicate code : trim
    const lines = commentedCode.loc.end.line - commentedCode.loc.start.line + 1;
    const linesMsg = '(' + lines + ' line' + (lines === 1 ? '' : 's') + ')';

    //TODO: support --fix in no-commented-out-code rule
    context.report({
      loc: commentedCode.loc
    }, 'commented out code ' //+ quote(code) + ' ' + linesMsg //TODO: update BIS
    );
  });

  return {}
};

// TODO: add recommanded: false
