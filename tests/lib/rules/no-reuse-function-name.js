/**
 * @fileoverview 
 * @author Emmanuel
 */
"use strict";

const rule = require("../../../lib/rules/no-reuse-function-name")
const RuleTester = require("eslint").RuleTester

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2017 } });
ruleTester.run("no-reuse-function-name", rule, {

    valid: [
      {
        code: "function x(){const a = 1;}",
      },
      {
        code: "function a(){const x = 1;}",
      },
      {
        code: "const x = function (){const x = 1;}",
      },
      // from https://gist.github.com/bakkot/24c28836580a94989084
      {
        code: "(function x(){\"use strict\"; x = 1;}());", // TypeError in Chrome
      },
      {
        code: "(function x(){x = 1; return x !== 1;}());", // write fails silently; function returns true
      },
    ],

    invalid: [
        {
            code: "function x(){const x = 1;}",
            errors: [{
                message: "valid but see https://gist.github.com/bakkot/24c28836580a94989084",
            }]
        },
        {
            code: "function x(){const a = 1; const x = 2}",
            errors: [{
                message: "valid but see https://gist.github.com/bakkot/24c28836580a94989084",
            }]
        },
    ]
});
