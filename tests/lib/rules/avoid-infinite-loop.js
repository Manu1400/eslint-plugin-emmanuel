const rule = require("../../../lib/rules/avoid-infinite-loop")
const RuleTester = require("eslint").RuleTester;

const valid = [
    { code: "while(n < 3){}" },
    { code: "while(false){}" },
    { code: "while(null){}" },
    { code: "while(undefined){}" }, // detected by core rule `no-unmodified-loop-condition`
    { code: "while(0){}" },
    { code: "for(var i = 0; i < 10; i++) {}" },
    //{ code: "for(var i = 0; i < 10; i++) {var a = 0; ;}" },
    { code: "while(NaN){}" }, // detected by core rule `no-unmodified-loop-condition`
    { code: "while(a <= a){}" },
    // no support `{n} = {n: 0}`
    { code: "let {n} = {n: 0}; while(n < 3){}", parserOptions: { ecmaVersion: 2019 } },
    { // too difficult to detect
        code: `
        function doLoop(x) {
            i = 3;
        }
        for (var i = 0; i < 10; i++) {
            doLoop(i + 1);
        }`,
    },
    {
        code: `while(typeof require("eslint").CLIEngine === "string"){}`
    },
    {
        code: `while(typeof require === "function"){}`
    },
    {
        code: `
        var version = parseInt(require("eslint").CLIEngine);
        while (version < 10) {
            version = parseInt(require("eslint").CLIEngine);
        }
        `
    },
    {
        code: `var a = 0; while(parseInt(a)){ }`
    },
    {
        code: `var filename = __filename; while(__filename == filename){ }`
    },
]
const invalid = [
    { // An infinite while loop
        code: `while(true){
            ;
        }`,
        errors: [{
            message: `⚠️ infinite loop`,
            type: "Literal", // in WhileStatement
            endLine: 1
        }]
    }, {
        code: "while(1){}",
        errors: [{
            message: `⚠️ infinite loop`,
            type: "Literal"
        }]
    }, {
        code: "while('a'){}",
        errors: [{
            message: `⚠️ infinite loop`,
            type: "Literal"
        }]
    }, {
        code: "for(;;){}",
        errors: [{
            message: `⚠️ infinite loop`,
            type: "ForStatement"
        }]
    }, {
        code: "for(var i = 0;;i++){}",
        errors: [{
            message: `⚠️ infinite loop`,
            type: "ForStatement"
        }]
    }, {
        code: `for(var i = 0; i = 1;i++){
            ;
        }`,
        errors: [{
            message: `⚠️ infinite loop`,
            type: "AssignmentExpression",
            endLine: 1
        }, {
            message: "block with only `;` in for",
            type: "EmptyStatement",
            line: 2
        }]
    }, {
        code: "do { } while (true);",
        errors: [{
            message: `⚠️ infinite loop`,
            type: "Literal" // in DoWhileStatement
        }]
    }, {
        code: "do { } while (1);",
        errors: [{
            message: `⚠️ infinite loop`,
            type: "Literal" // in DoWhileStatement
        }]
    }, { // https://www.freecodecamp.org/forum/t/getting-an-infinite-loop-for-simple-function/141738
        code: `
        function getIndexToIns(arr, num) {
            arr.sort(function (a,b) { return a-b; });
            
            for (var i=0;i<arr.length;i++){
                if (num < arr[i]){
                    arr.splice(i, 0, num);
                }
            }
            return arr;
        }`,
        errors: [{
            message: `maybe a infinite loop: array.splice in a for`,
            type: "CallExpression" // Identifier -> `splice`
        }]
    }, {
        code: `            
        for (;i<arr.length;){
            arr.splice()
        }
        `,
        errors: [{
            message: `maybe a infinite loop: array.splice in a for`,
            type: "CallExpression" // Identifier -> `splice`
        }]
    }, { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for#Optional_for_expressions
        code: `
        for (var i = 0;; i++) {
            console.log(i);
            if (i > 3) break; // not a infinite loop with that
        }`,
        errors: [{
            message: `⚠️ infinite loop`,
            type: "ForStatement"
        }]
    }, { // const
        code: "var iceCapsAreMelting = true; while (iceCapsAreMelting) {}",
        errors: [{
            message: `⚠️ infinite loop`,
            type: "Identifier"
        }]
    }, {
        code: "var bool = true; while(bool === true){}",
        errors: [{
            messageId: "maybeInfiniteLoop",
            type: "BinaryExpression"
        }]
    }, {
        code: "while(!NaN){}",
        errors: [{
            message: `⚠️ infinite loop`,
            type: "UnaryExpression"
        }]
    }, {
        code: "while(!Number.NaN){}",
        errors: [{
            message: `⚠️ infinite loop`,
            type: "UnaryExpression"
        }]
    }, {
        code: "while(Number.EPSILON){}",
        errors: [{
            message: `⚠️ infinite loop`,
            type: "MemberExpression"
        }]
    }, {
        code: "const a = 0; while(a <= a){}",
        parserOptions: { ecmaVersion: 2019 },
        errors: [{
            messageId: "maybeInfiniteLoop",
            //type: "MemberExpression"
        }]
    }, {
        code: "var a = 0; while(a <= a){}",
        errors: [{
            messageId: "maybeInfiniteLoop",
            //type: "MemberExpression"
        }]
    }, {
        code: "while(a = 1 && a <= a){}",
        errors: [{
            message: `⚠️ infinite loop`,
            //type: "MemberExpression"
        }]
    }, { // two problems
        code: "while((a = 1) && (isDefined = true)){}",
        errors: [{
            message: `⚠️ infinite loop`,
            //type: "MemberExpression"
        }]
    }, {
        code: `while (true) {
            while (true) {
                ;
            }
        }`,
        errors: [{
            message: `⚠️ infinite loop`,
            type: "Literal", // in WhileStatement
            line: 1
        }, {
            message: `⚠️ infinite loop`,
            type: "Literal", // in WhileStatement
            line: 2
        }]
    }, { // not a infinite loop, but if you comment `bool = false` it give a infinite loop
        code: "var bool = true; while(bool === true){ bool = false; }",
        errors: [{
            messageId: "maybeInfiniteLoop",
            //type: "MemberExpression"
        }]
    }, { // not a real infinite loop but it a strange code
        code: "while(Number.NaN){}",
        errors: [{
            message: `⚠️ infinite loop`,
            //type: "MemberExpression"
        }]
    }, {
        code: "const a = 0; do { } while(a <= a)", // detected by core rule `no-unmodified-loop-condition`
        parserOptions: { ecmaVersion: 2019 },
        errors: [{
            messageId: "maybeInfiniteLoop",
            //type: "MemberExpression"
        }]
    }, { // empty statement
        code: "do { ; } while(n < 3)",
        errors: [{
            message: "block with only `;` in for", //TODO: for -> do while
            //type: "MemberExpression"
        }]
    }, { // not detected by core rule `no-unmodified-loop-condition`
        code: `
        var a = [0, 0], b = [2, 2];
        do {
            //a.splice(), b
        } while(a.length == b.length)
        `,
        errors: [{
            messageId: "maybeInfiniteLoop", // .length can create a infinite loop
            //type: "MemberExpression"
        }]
    }, { // not detected by core rule `no-unmodified-loop-condition`
        code: `
            var a = [], b = [];
            while(a.length == b.length) {
                //a.splice(), b
            }`,
        errors: [{
            messageId: "maybeInfiniteLoop", // .length can create a infinite loop
            //type: "MemberExpression"
        }]
    }, {
        code: `
            var strA = "str", strB = "str";
            while (strA.length === strB.length) {
                //a.splice(), b
            }`,
        errors: [{
            messageId: "maybeInfiniteLoop", // .length can create a infinite loop
            //type: "MemberExpression"
        }]
    }, { // not a infinite loop, but if you comment `strA += " long"` it give a infinite loop
        code: `
            var strA = "str", strB = "str";
            while (strA.length === strB.length) {
                strA += " long"
            }`,
            errors: [{
                messageId: "maybeInfiniteLoop",
                type: "BinaryExpression"
            }]
    }, { // not a infinite loop, but if you comment `strA += " long"` it give a infinite loop
        code: `
            var strA = "str", strB = "str";
            while (strA === strB) {
                strA += " long"
            }`,
            errors: [{
                messageId: "maybeInfiniteLoop",
                type: "BinaryExpression"
            }]
    }, {
        code: `while(eval("true")){}`,
        errors: 0
    }, {
        code: `while(window.eval("true")){}`,
        errors: 0
    },
]

var ruleTester = new RuleTester();
ruleTester.run("avoid-infinite-loop", rule, { valid, invalid });

module.exports = {
  valid,
  invalid
}