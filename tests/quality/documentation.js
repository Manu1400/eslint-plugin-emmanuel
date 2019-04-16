const isUrl = require('is-url')
const { categories } = require("eslint/conf/category-list")

const checkUrl = function(str) {
    if (isUrl(str) == false) {
        console.error('url of plugin is not an URL')
    }
    //var obj = new URL(str)
}

function checkMetadata(meta) {
    checkUrl(meta.docs.url)
    if (meta.docs.description.length < 5) {
        console.warn("description too short")
    }
}

function checkCategory(category = "") {
    const eslintCategories = categories.map(obj => obj.name)
    if (eslintCategories.includes(category) == false) {
        console.error("this category in not a eslint category: " + category)
    }
}

function checkRule(ruleName) {
    const { meta } = require('../../lib/rules/' + ruleName)
    console.log("check rulename: " + ruleName)
    checkMetadata(meta)
    checkCategory(meta.docs.category)
}

function checkAllRulesExposed() {
    const { rules } = require('../../')
    const rulesnameArr = Object.keys(rules)
    rulesnameArr.forEach(function (rulename) {
        checkRule(rulename)
    })
}

checkAllRulesExposed()
// check all rules from lib/rules