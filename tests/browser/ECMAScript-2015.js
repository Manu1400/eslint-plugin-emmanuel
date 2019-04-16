"use strict";
// from https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode
var o = { p: 1, p: 2 }; // !!! erreur de syntaxe

function somme(a, a, c) { // !!! erreur de syntaxe
    "use strict";
    return a + b + c; // Ce code va planter s'il est exécuté
}

let a = 0o10; // Notation octale ES2015

false.true = "";         // TypeError
