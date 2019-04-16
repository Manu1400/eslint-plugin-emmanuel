__dirname // avoid __dirname
__filename // avoid __filename

/*
try {
    __dirname
    __filename
} catch (err) {
    console.error(err)
}
*/

// from https://stackoverflow.com/questions/8817423/node-dirname-not-defined
/* eslint {"no-global-assign": ["error", {"exceptions": ["__dirname", "__filename"]}]} */
__dirname = path.resolve(path.dirname(''));
