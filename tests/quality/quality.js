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
            assert.equal((meta.docs.description || '').length >= 5, true);
          });
          it('should having an documentation URL', function() {
            assert.equal(typeof meta.docs.url, 'string');
          });
          it('should having an good documentation URL', function() {
            //console.warn(meta.docs.url)
            assert.equal(isUrl(meta.docs.url), true);
          });
          it('should having a category', function() {
            assert.equal(typeof (category), 'string');
          });
          it('should having a good category', function() {
            assert.equal(checkCategory(category), true);
          });
        });
    });
})