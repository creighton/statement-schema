/**
 *
 */

(   // begin closure
    module.exports = function (messages) {
        console.log('formatMessage');
        let str = "\nThe results of validating the statement are:\n";
        for (const msg of messages) {
            if (typeof msg === 'string') {
                str += '\n\t' + msg;
            } else if (msg) {
                for (const m of msg) {
                    str += '\n\t' + JSON.stringify(m.message);
                }
            }
        }
        return str;



    //     const fs = require('fs');
    //     const folder = './statements/';
    //     let stmts = [];
    //
    //     for (const name of names) {
    //         console.log('About to read a file');
    //         console.log(name);
    //         const data = fs.readFileSync(folder + name, 'utf8');
    //         const stmt = JSON.parse(data);
    //         stmts.push(stmt);
    //     }
    //     console.log(`${stmts.length} files parsed and ready`);
    //     const processStmt = require('./processStmt');
    //     for (const stmt of stmts) {
    //         processStmt(stmt, cb);
    //     }
    }
);  // end closure
