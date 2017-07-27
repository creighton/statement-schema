/**
 * Takes an array of file names and reads and processes each.
 */

(   // begin closure
    module.exports = function (names, cb) {
        console.log('parseFiles');
        // const fs = require('fs');
        const path = require('path');
        const glob = require('glob');
        // const fwdSlash = '/';
        // const backSlash = '\\';
        // const folder = './test/statements/';
        let stmts = [];
        // let count = 0;

        for (let name of names) {
            let obj = path.parse(name);
            console.log(`About to read file ${name}`);
            console.log(`./test/statements/**/${obj.name}.json`);

            console.log(`and the path object is ${JSON.stringify(obj)}`);

            glob.sync(`./test/statements/**/${obj.name}.json`).forEach((file) => {
                // count += 1;
                console.log(file);
                stmts.push(require(path.resolve(file)));
            });
            console.log(`${stmts.length} files parsed and ready ${JSON.stringify(stmts)}`);
            const processStmt = require('./processStmt');
            for (const stmt of stmts) {
                processStmt(stmt, cb);
            }
        }
    }

);  // end closure
