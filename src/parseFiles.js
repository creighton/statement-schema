/**
 *
 */

(   // begin closure
    module.exports = function (names, cb) {
        // console.log('parseFiles');
        const fs = require('fs');
        const path = require('path');
        const folder = './test/statements/';
        let stmts = [];

        for (let name of names) {
            console.log(`About to read file ${name}`);
            if (!name.includes(folder)) {name = folder + name;}
            stmts.push(require(path.resolve(name)));
        }
        console.log(`${stmts.length} files parsed and ready`);
        const processStmt = require('./processStmt');
        for (const stmt of stmts) {
            processStmt(stmt, cb);
        }
    }

);  // end closure
