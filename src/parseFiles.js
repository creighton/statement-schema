/**
 * Takes an array of file names and reads and processes each.
 */

(   // begin closure
    module.exports = function (names, cb) {
        // console.log('parseFiles');
        const path = require('path');
        const glob = require('glob');
        let stmts = [];

        for (let name of names) {
            let obj = path.parse(name);
            console.log(`About to read file ${name}`);

            glob.sync(`./test/statements/**/${obj.name}.json`).forEach((file) => {
                console.log(file);
                stmts.push(require(path.resolve(file)));
            });
            console.log(`${stmts.length} files parsed and ready`);
            const processStmt = require('./processStmt');
            for (const stmt of stmts) {
                processStmt(stmt, cb);
            }
        }
    }
);  // end closure
