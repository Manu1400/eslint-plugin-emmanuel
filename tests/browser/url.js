// from https://github.com/iamturns/configrrr documentation
//module.exports = { API_URL: 'http://dev.example.com/' };

const port = 110;
module.exports = { API_URL: undefined, port };

const process = require('process');
process.debugPort = 110

const API_URL = 'http://dev.example.com/'
var URL = ''

var URL = 'file:///Users/emmanuel/github/'

var URL_o = 'http://dev.example.com/test#my_hash'

{ API_URL: 'http://dev.example.com/' }

{ API_URL }

var API_TEST;

//TODO : use https://github.com/unshiftio/requires-port
API_URL = 'http://localhost:80/'

//TODO: use https://github.com/jonschlinkert/is-git-url
//TODO: avoid IP
API_URL = 'http://192.168.101.127/user/project.git'


// anon function

const a = function (API_URL = "") {
}

const b = function (API_URL="", param2="") {
}

function c (API_URL="") {
}
