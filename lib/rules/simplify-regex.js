/**
 * @author Emmanuel
 */
"use strict";

const { parse } = require('reflect-type-3')

const A_NUMBER = 97
const Z_NUMBER = 122
const maxLength = 200

/* eslint-disable max-statements */

const create = function (context) {
  const sourceCode = context.getSourceCode()

  return {
    /**
     * @param {RegExpLiteral} node
     */
    // , RegExpLiteral: for new version of babylon
    // , LiteralRegExpExpression : for shift parser
    // traceur parser: too special
    // parser `typescript` : too special ?
    // parser `uglify-js` : special
    'Literal[regex.pattern]': node => {
      const { pattern } = node.regex

      // protection against large regex expressions
      if (pattern.length > maxLength) {
        return;
      }

      // check parentheses in regex -> if -> return;

      var bool;
      try {
        // parse the regex with reflect-type-3 librairy
        const parsed = parse(pattern)
        bool = false
      } catch (err) {
        bool = true
      }
      if (bool)  {
        return;
      }

      const parsed = parse(pattern) // duplicate code
      const [alternative] = parsed.alternatives
      const ranges = alternative.terms[0].atom.ranges || []

      const { negated } = parsed.alternatives[0].terms[0].atom

      const map1 = ranges.map(function(item) {
        // https://fr.wikipedia.org/wiki/American_Standard_Code_for_Information_Interchange
          return (item.end === item.start) && item.start <= Z_NUMBER && item.start >= A_NUMBER
      })
      const map2 = ranges.map(function(item, index) {
          const next = ranges[index + 1] || {start: -10}
          const isLatest = index === (ranges.length -1)
          const notA = item.start !== A_NUMBER
          return (item.end + 1) === next.start || (isLatest && notA)
      })
      const map3 = ranges.map(function(item, index) {
          const next = ranges[index + 1] || {start: -10}
          const isLatest = index === (ranges.length -1)
          const notZ = item.start !== Z_NUMBER
          return (item.end - 1) === next.start || (isLatest && notZ)
      })

      // Handle regex literal inside RegExp constructor in the other handler
      //if (node.parent.type === 'NewExpression' && node.parent.callee.name === 'RegExp') {
      //  return
      //}
      const needReport = (!map2.includes(false) || !map3.includes(false))

      if (ranges.length > 1 && !map1.includes(false) && needReport) {
        context.report({
          node,
          message: 'simplify regex expression',
          fix: function(fixer) {
            const {range} = sourceCode.getTokenBefore(node)
            const extract = function (str) {
              const nb = pattern.length - ranges.length

              const firstLetter = String.fromCharCode(ranges[0].start)
              // const lastLetter  = String.fromCharCode(ranges[ranges.length - 1].start)
              if (negated) {
                return '[^'+ firstLetter+'-'+ str.substr(-nb+1, nb+1)
              }
              return '['+firstLetter+'-'+ str.substr(-nb, nb)
            }

            return [
              fixer.remove(node),
              fixer.insertTextAfterRange(range, ' /'+extract(pattern)+'/'),
            ]
          },
        })
      }
    },
  }
}

/**
 * @type {Fixable}
 */
const fixable = 'code'

module.exports = { //TODO: non recommende
  create,
  meta: {
    type: 'suggestion',
    docs: {
      description: "simplify regex",
      //url: '',
    },
    fixable,
  }
}
