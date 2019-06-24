// https://twitter.com/em4nl/status/1093897512606466048

/*eslint-env browser*/
let imageWidth = event.target.naturalWidth

// This property is not universally supported and even when supported introduces potential fragility to your code
window.event.target.naturalWidth

function getImageMeta(file, callback) {
    var r = new FileReader();
    var err = null;
    var meta = null;
    r.onload = function(event) {
        callback(err, meta);
    };
    r.onerror = function(event) {
        callback(event.target.error, meta);
    };
    r.readAsBinaryString(file);
}
