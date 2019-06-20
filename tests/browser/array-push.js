// pure https://github.com/purely-functional/eslint-plugin-pure

var array = []
array.push(1)
array.push() // do nothing, return length: 1
array // do nothing, but https://eslint.org/demo/ keep it
array.push(undefined)
array.push(undefined)
array.push(0)
array.push(1)
array.push(`dd`)
array.push(`first`, `second`)
array.push({array}) // WTF, recursive array

// deprecated config: https://www.npmjs.com/package/eslint-config-cleanjs


document.querySelector("#test").querySelectorAll("div div div")
// on https://astexplorer.net/ :
// -> $node.type == "ExpressionStatement" && $node.expression.arguments[0].raw == '"div div div"'
// and an other node : $node.name == "querySelectorAll"

// remove empty # on URL in comments and str

// message: see https://www.lvh.io/posts/queryselectorall-from-an-element-probably-doesnt-do-what-you-think-it-does.html


var global = 0 // WTF: THIS CASE
var process = 0 // WTF