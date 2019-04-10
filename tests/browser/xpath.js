var body = document.getElementsByTagName("body")[0];
document.evaluate("empty string", body)

document.evaluate("//test", body)
var str = "//test"
document.evaluate(str, body)

document.evaluate(`no value`)

document.evaluate("")
document.evaluate()

/* eslint-disable-next-line no-undef */
evaluate("empty string", body) // valid

document.evaluate("count(//p)")
document.evaluate("count(//div)", document)

// wrong example ?
document.evaluate("count(//p)", document, null, XPathResult.ANY_TYPE, null)

document.evaluate("//p", document, null, 0, null) // magic number

// https://github.com/angular/protractor/blob/5d8da049815ffc104e6eca71d2ecaec51b00f520/lib/selenium-webdriver/lib/by.d.ts
