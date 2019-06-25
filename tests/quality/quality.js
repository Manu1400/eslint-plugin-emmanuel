/* eslint-disable no-undef */
const assert = require('assert');
const isUrl = require('is-url')

const { categories } = require("eslint/conf/category-list")

function checkCategory(category = "") {
    const eslintCategories = categories.map(obj => obj.name)
    if (eslintCategories.includes(category) === false) {
        console.error("this category in not a eslint category: " + category)
        return false
    }
    return true
}

const path = '../../'

const { rules } = require('../../') // -> ./
Object.keys(rules).forEach(function (rulename) {
    const { meta } = require(path + '/lib/rules/' + rulename)
    const category = meta.docs.category

    describe(rulename, function() {
        describe('description of the rule', function() {
          it('should having long description', function() {
            assert.strictEqual((meta.docs.description || '').length >= 5, true);
          });
          it('should having an documentation URL', function() {
            assert.strictEqual(typeof meta.docs.url, 'string');
          });
          it('should having an good documentation URL', function() {
            //console.warn(meta.docs.url)
            assert.strictEqual(isUrl(meta.docs.url), true);
          });
          it('should having a category', function() {
            assert.strictEqual(typeof (category), 'string');
          });
          it('should having a good category', function() {
            assert.strictEqual(checkCategory(category), true);
          });
        });
    });
})