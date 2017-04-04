/**
 *
 */

(   // begin closure
    module.exports = function (cb) {
        console.log('promptForFile');
        const parseFiles = require('./parseFiles.js');
        parseFiles(['various.json'], cb);
        // cb(null, ['statements/various.json']);
    }
);  // end closure
