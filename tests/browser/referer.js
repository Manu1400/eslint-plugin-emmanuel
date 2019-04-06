
new URL(document.referrer) // issue with ""
// solution:
// - a try block
// - a if
// - a default value with ||

document.referrer = "http://perdu.com/?k=lllooll" // readOnly property

// other file //
var body = document.getElementsByTagName("body")[0]

// Uncaught DOMException: Failed to execute 'evaluate' on 'Document': The string '' is not a valid XPath expression.
document.evaluate("", body) // error with ""
