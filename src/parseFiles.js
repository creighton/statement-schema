/**
 *
 */

(   // begin closure
    module.exports = function (names, cb) {
        console.log('parseFiles');
        const fs = require('fs');
        const path = require('path');
        const glob = require('glob');
        const fwdSlash = '/';
        const backSlash = '\\';
        const folder = './test/statements/';
        let stmts = [];
        let count = 0;

        for (let name of names) {
            let obj = path.parse(name);
            console.log(`About to read file ${name}`);
            console.log(`./test/statements/**/${obj.name}.json`);
            // let backup = path.parse(__dirname);
            // console.log(`the Directory path is ${JSON.stringify(backup)}`);
            // console.log(`and the path object is ${JSON.stringify(obj)}`);
            // let goodname = /*(obj.root || backup.root) +*/ (obj.dir || backup.dir) + fwdSlash + backup.name + fwdSlash + obj.name + obj.ext;
            // console.log(goodname);
            glob.sync(`./test/statements/**/${obj.name}.json`).forEach((file) => {
                count += 1;
                console.log(file);
                stmts.push(require(path.resolve(file)));
            });
            // console.log(`${stmts.length} files parsed and ready ${JSON.stringify(stmts)}`);
            const processStmt = require('./processStmt');
            for (const stmt of stmts) {
                processStmt(stmt, cb);
            }
        }
    }

);  // end closure
