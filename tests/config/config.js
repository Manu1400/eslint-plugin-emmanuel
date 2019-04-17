/**
 * @fileoverview config file .eslintrc.json
 * @author Emmanuel
 */
"use strict";

const RuleTester = require("eslint").RuleTester;
const { rules } = require("../../");

// other solution: https://eslint.org/docs/developer-guide/nodejs-api#clienginegetconfigforfile
// ... https://eslint.org/docs/developer-guide/nodejs-api#clienginegetrules
const checkRule = function (ruleName) {
    const rule = rules[ruleName] // require("../../lib/rules/" + ruleName)
    const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2017 } });

    ruleTester.run(ruleName, rule, {
    
        valid: [
          "function foo() { return; }",
          // https://github.com/eslint/eslint/issues/11611
          "(((3496.29)).bkufyydt = 2e308) ? foo : bar",
          "() => /*\n*/ (a = () => b) => c",
          {
            code: "var x; \n try { x = 1; } \n catch { ; };",
            parserOptions: { ecmaVersion: 2019 }, // 2019 only ?
          },
          "const fn = \"hello\";",
          // https://twitter.com/spankie_dee/status/1114982372590673924
          "const fn = \"hello\"; \n const obj = {hello: \"Hi There\"}; \n const {[f]: sayhello} = obj;",
          "var aaaaaaaaaaaaaaaaaaaaaaaaaaa = 3;function b() {var a = 10;}",
          // https://github.com/gaspaonrocks/nodebestpractices/blob/french-translation/README.french.md#-39-do-require-on-the-folders-not-directly-on-the-files
          "require('./index.js')",
          // https://twitter.com/RobinDrexler/status/905064033367326720
          "setTimeout(_,0);",
          // https://twitter.com/delster2/status/1117049960221040641
          // crappy...
          "const gcd=(x,y)=>(y===0)?x:gcd(y,x%y)",
          // https://twitter.com/joshmanders/status/1116440050739359755
          {
            code: "var hello = { ...undefined }",
            parserOptions: { ecmaVersion: 2019 }, // 2019 only
          },
          // https://twitter.com/FokkeZB/status/1115214707399581702
          {
            code: "const arr = [1, 1, 1, 2, 1]; const uniqueArray = [...new Set(array)];",
            parserOptions: { ecmaVersion: 2019 }, // 2019 only
          },
          {
            code: "var a = 1",
          },
          // but its a Anti Pattern
          // https://github.com/gaspaonrocks/nodebestpractices/blob/french-translation/sections/errorhandling/useonlythebuiltinerror.md
          {
            code: "throw (\"How can I add new product when no value provided?\")",
          },
          {
            code: "const a = 1",
            filename: "valid.js"
          },
          {
            code: "let a = 2",
            parserOptions: { ecmaVersion: 6 },
          },
          {
            code: "var a, b; a = 1; b = 2; var c = a + b;",
          },
          {
            code: "'concat ' + 'a string'[0]",
          },
          {
            code: "var myvariable",
          },
          //{
          //  code: "// $set",
          //},
          {
            code: "// eslint-disable-next-line",
          }, 
          {
            code: "var a = 1 + 2; var b = a + 0;",
          },
          {
            code: "10.50",
          },
          {
            code: ".5 + .1",
          },
          {
            code: "Math.PI * Math.random(); ",
          },
          {
            code: "cos = Math.cos",
          },
          // from https://github.com/erikdesjardins/eslint-plugin-consistent-return-legacy/blob/24376d7703abe8ff91931dd463f750025987c245/tests/consistent-return.js#L45
          {
            code: "var foo = () => { if (true) return true; else return; }",
            parserOptions: { ecmaVersion: 6 },
          },
          {
            code: "function foo() { if (true) return; else return false; }",
          },
          {
            code: "if (true) { return 1; } return 0;",
            parserOptions: {
                ecmaFeatures: { globalReturn: true }
            }
          }
        ],
    
        invalid: [
        ]
    });
}

Object.keys(rules).forEach(function (rulename) {
  checkRule(rulename)
})
