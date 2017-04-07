/**
 *
 */

(   // begin closure
    module.exports = function (cb) {
        console.log('allStmts');
        const fs = require('fs');
        let names, stmts;
        fs.readdir('./test/statements', 'utf8', (err, files) => {
            if (err) throw err;
            console.log(files);
            const parseFiles = require('./parseFiles.js')
            parseFiles(files, cb);

        });
    }
);  // end closure
