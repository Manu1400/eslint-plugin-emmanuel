const { parse } = require('reflect-type-3')

const message = 'simplify regex expression'

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "simplify regex",
      //url: 'http://example.org',
    },
    fixable: 'code',
  },

  create: function (context) {
    const sourceCode = context.getSourceCode()

    return {
      'Literal[regex]': node => {
        const oldPattern = node.regex.pattern
        // const { flags } = node.regex

        const parsed = parse(oldPattern)
        const alternative = parsed.alternatives[0] || []
        const ranges = alternative.terms[0].atom.ranges || []

        const isNegated = parsed.alternatives[0].terms[0].atom.negated || false

        const map1 = ranges.map(function(item) {
          // https://fr.wikipedia.org/wiki/American_Standard_Code_for_Information_Interchange
            return (item.end === item.start) && item.start <= 122 && item.start >= 97
        })
        const map2 = ranges.map(function(item, index) {
            const next = ranges[index + 1] || {start: -10}
            const isLatest = index === (ranges.length -1)
            const notA = item.start !== 97
            return (item.end + 1) === next.start || (isLatest && notA)
        })
        const map3 = ranges.map(function(item, index) {
            const next = ranges[index + 1] || {start: -10}
            const isLatest = index === (ranges.length -1)
            const notZ = item.start !== 122
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
            message,
            fix: function(fixer) {
              const range = sourceCode.getTokenBefore(node) == null ?
                null : sourceCode.getTokenBefore(node).range
              const extract = function (str) {
                var nb = oldPattern.length - ranges.length

                const firstLetter = String.fromCharCode(ranges[0].start)
                // const lastLetter  = String.fromCharCode(ranges[ranges.length - 1].start)
                if (isNegated) {
                  const s = isNegated ? '^':''
                  return '['+s+ firstLetter+'-'+ str.substr(-nb+1, nb+1)
                }
                return '['+firstLetter+'-'+ str.substr(-nb, nb)
              }
              if (range == null) {
                return []
              }

              return [
                fixer.remove(node),
                fixer.insertTextAfterRange(range, ' /'+extract(oldPattern)+'/'),
              ]
            },
          })
        }
      },
    }
  },
}
