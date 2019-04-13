"use strict";

const rule = require("../../../lib/rules/no-commented-out-code")
const RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("no-commented-out-code", rule, {

    valid: [
      {
        code: "// this is a long comment about nothing",
      },
      {
        code: "//this is a long comment about nothing",
      },
      {
        code: "// comment",
      },
      {
        code: "// a long comment about life // comment in comment",
      },
      {
        code: "//",
      },
      {
        code: "/* */",
      },
      {
        code: "// please don't call method getElement()",
      },
      {
        code: "/*\n\n\n\n\n\n\n\n\n\n\n\n*/",
      },
      {
        code: "//TODO",
      },
      // TODO:  False-positive in rule "no-commented-out-code" with TODO
      // see https://github.com/bahmutov/eslint-rules/issues/10
      //{
      //  code: "// TODO: test",
      //},
      // https://github.com/bahmutov/eslint-rules/issues/17
      {
        code: "/* if(bar === true) {return true;} */",
      },
      {
        code: "/* if(bar === true)\n {return true;} */",
      },
      {
        code: "/* if(bar === true)\n return true; */",
      },
      {
        code: "/* if (true)\n {return true;} */",
      },
      // https://github.com/bahmutov/eslint-rules/issues/36
      {
        code: "// $FlowFixMe",
      },
      // ok
      {
        code: "/* @flow */",
      },
      {
        code: "// @flow",
      },
      // complete example: https://flow.org/en/docs/types/comments/
      {
        code: "/*flow-include\ntype Foo = {\nfoo: number\n};\n*/",
      },
    ],

    invalid: [
        {
            code: "// elephant + zoo",
            errors: [{
                message: 'commented out code '
            }]
        },
        {
            code: "// item // comment in comment",
            errors: [{
                message: 'commented out code '
            }]
        },
        {
            code: "//; test",
            errors: [{
                message: 'commented out code '
            }]
        },
        {
            code: "// var a = 0 / 1",
            errors: [{
                message: 'commented out code '
            }]
        },
        // without space
        {
            code: "//var a = 0 / 1",
            errors: [{
                message: 'commented out code '
            }]
        },
        {
            code: "/* var a = 1; \n const b = 2; \n var c = 3; */",
            errors: [{
                message: 'commented out code '
            }]
        },
        {
            code: "//'use strict'",
            errors: [{
                message: 'commented out code ' //`commented out code "'use strict'" (1 line)`
            }]
        },
        {
            code: "// var a = 1",
            errors: [{
                message: 'commented out code ' //`commented out code "var a = 1" (1 line)`
            }]
        },
        {
            code: "// const a = 1",
            errors: [{
                message: 'commented out code ' //`commented out code "const a = 1" (1 line)`
            }]
        },
    ]
});
