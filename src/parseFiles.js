/**
 * Takes an array of file names and reads and processes each.
 */

(   // begin closure
    module.exports = function (names, cb) {
        // console.log('parseFiles');
        const path = require('path');
        const glob = require('glob');
        const processStmt = require('./processStmt');
        let stmts = [];

        for (let name of names) {
            let obj = path.parse(name);
            // console.log(`About to read file ${name}`);

            glob.sync(`./test/statements/**/${obj.name}.json`).forEach((file) => {
                // console.log(file);
                // console.log(name, obj.name);
                // console.log(`${names.length} files parsed and ready`);
                processStmt(require(path.resolve(file)), obj.name, cb);
            });
        }
    }
);  // end closure
