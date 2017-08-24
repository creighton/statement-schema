/**
 * This function uses glob to gather all the example statement stored in the /test/statements folder and process them against the validator.
 */

// (   // begin closure
    // Tom's Stuff
    // module.exports = function getAll (cb) {
    // {
        const path = require('path');
        const parseFiles = require('./src/parseFiles.js');
        const ps = require('./src/processStmt.js');
        const glob = require('glob');
        var stmts = [];
        let count = 0;
        glob.sync('../xAPI-SCORM-Profile/statements/**/*.json').forEach((file) => {
            count += 1;
            stmts.push(file);
        });
        // console.log(stmts);
        // parseFiles(stmts, (err, res) => {
        for(name in stmts) {
            // console.log('begin for loop to require and validate statements');
            ps(require(stmts[name]), stmts[name], (err, res, filename) => {
                console.log(err || filename, res.join().includes('error')? 'fail' + res.join('\n\t'): 'Pass', '\n');
            });
        }
    // }

// );  // end closure
// console.log(module.exports.getAll());
// module.exports.getAll();
