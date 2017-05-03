/**
 *
 */

(   // begin closure
    module.exports = function (names, cb) {
        // console.log('parseFiles');
        const fs = require('fs');
        const folder = '../test/statements/';
        let stmts = [];

        for (const name of names) {
            // console.log('About to read a file');
            // console.log(name);
            const stmt = require('../test/statements/' + name);
            // console.log(stmt);
            stmts.push(stmt);
        }
        console.log(`${stmts.length} files parsed and ready`);
        const processStmt = require('./processStmt');
        for (const stmt of stmts) {
            processStmt(stmt, cb);
        }
    }
);  // end closure
