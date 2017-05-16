/**
 *
 */

(   // begin closure
    module.exports = function (names, cb) {
        console.log('parseFiles');
        const fs = require('fs');
        const path = require('path');
        const folder = './test/statements/';
        let stmts = [];

        for (let name of names) {
            console.log('About to read a file');
            console.log(name);
            // console.log(require(path.resolve(name)));
            console.log(__dirname);
            if (!name.includes(folder)) {name = folder + name;}
            stmts.push(require(path.resolve(name)));
            // const data = fs.readFileSync(name, 'utf8');
            // const stmt = JSON.parse(data);
            // stmts.push(stmt);
        }
        console.log(`${stmts.length} files parsed and ready`);
        const processStmt = require('./processStmt');
        for (const stmt of stmts) {
            processStmt(stmt, cb);
        }
    }

);  // end closure
