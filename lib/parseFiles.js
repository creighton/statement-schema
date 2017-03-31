/**
 *
 */

(   // begin closure
module.exports = function (names, cb) {
    console.log('parseFiles');
    const fs = require('fs');
    const folder = './statements/';
    let stmts = [];
    // console.log(fs);
    for (const name of names) {
        console.log('About to read a file');
        console.log(name);
        const data = fs.readFileSync(folder + name, 'utf8');
        const stmt = JSON.parse(data);
        stmts.push(stmt);
    }
    console.log(`${stmts.length} files parsed and ready`);
    cb(null, stmts);
}
);  // end closure
