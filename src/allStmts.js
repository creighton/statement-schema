/**
 *
 */

(   // begin closure
    // Tom's Stuff
    module.exports = function getAll (cb) {
        const glob = require('glob');
        const path = require('path');
        const parseFiles = require('./parseFiles.js');
        var stmts = [];
        let count = 0;
        glob.sync('./test/statements/**/*.json').forEach((file) => {
            count += 1;
            stmts.push(file);
        });
        console.log(stmts);
        parseFiles(stmts, cb);
    }

);  // end closure
