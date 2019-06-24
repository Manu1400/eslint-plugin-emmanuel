/* eslint-env browser */
// documentation: https://github.com/brianloveswords/node-jws
const jws = require("jws")

const secret = require("./secret.json")
secret.key

const signature = jws.sign({
    header: { alg: 'HS256' },
    payload: 'h. jon benjamin',
    secret: 'has a van',
  });

const value = jws.sign({
    header: { alg: 'HS256' },
    payload: 'h. jon benjamin',
    privateKey: 'private key',
});

jws.createSign({
    header: { alg: 'RS256' },
    privateKey: privateKeyStream,
    payload: payloadStream,
    encoding: 'utf8'
});

const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

var options = {
    header: { alg: 'RS256' },
    privateKey: privateKeyStream,
    payload: payloadStream,
};

// return VerifyStream object
var obj = jws.createVerify(options)
console.log(obj.secret)

const AWS_TOKEN = "j";
"AKIAIUWUUQQN3GNUA88V"

">HS5pz)~</{g5T9\\" // generated paswword
"bjUsQNuXFa8k++mJGp*+2adk44^Cr-ShGCh6uey8@" // generated paswword

// from https://en.wikipedia.org/wiki/JSON_Web_Token
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI"

/*
var arr = []

Promise.all([])
Promise.all()
Promise.all(arr)
Promise.all([
    p1.catch(error => { return error }),
    p2.catch(error => { return error }),
    p3.catch(error => { return error })
  ])

  Promise.all([p1, p2, p3].map(p => {
    p.then(value => {
      console.log(value);
    }).catch(error => {
      console.log(error);
    });
  }));
  */

  var arr = new Promise();

  arr = new Promise();

  new PasswordCredential({
    id: "id",
    password: "secret"
  })

  new PasswordCredential({})

  new window.PasswordCredential({
    id: "id",
    password: "secret"
  })

  window.Infinity
  Infinity

var iconURL = "https://example.com/icon"

  var c = new PasswordCredential({
    id: 'id',
    password: 'pencil',
    name: 'name',
    iconURL: 'https://example.com/icon.png'
});

//var iconURL = "https://example.com/icon.png"
//var iconURL = "https://example.com/index.php"

({
    iconURL: 'https://example.com/index.test'
}).iconURL

c.iconURL

// https://github.com/ustroetz/ustroetz.github.io/blob/9734f2da77ae4ef36fd60e276c08ff9c818c9542/otp-web-interface/js/otp/modules/planner/IconFactory.js#L31
var EndFlagIcon = L.Icon.extend({
    options: {
        iconUrl: resourcePath + 'images/marker-flag-end-shadowed.png', // <--
        shadowUrl: null,
        iconSize: new L.Point(48, 49),
        iconAnchor: new L.Point(46, 42),
        popupAnchor: new L.Point(0, -16)
    }
});
