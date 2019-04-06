// wrong example ?
document.evaluate("count(//p)", document, null, XPathResult.ANY_TYPE, null)

document.evaluate("//p", document, null, XPathResult.ANY_TYPE, null) // magic number

// magic numbers:

document.evaluate("//p", document, null, 0, null)
document.evaluate("count(//p)", document, null, 0, null)

document.evaluate("//p", document, null, 8, null)
document.evaluate("count(//p)", document, null, 8, null)

//TODO: add code for
/* eslint-disable-next-line no-undef */
by.xpath("//a[starts-with(@href, 'something')]")
// see https://github.com/alecxe/eslint-plugin-protractor/blob/master/docs/rules/no-by-xpath.md

// see https://github.com/angular/protractor/blob/5d8da049815ffc104e6eca71d2ecaec51b00f520/lib/selenium-webdriver/lib/by.d.ts

// install https://www.npmjs.com/package/cypress-xpath
