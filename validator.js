/**
 * This is the main program for validating xAPI statements from the command
 * line.  It takes a filename as a command line argument as the statement or
 * array of statements to be verified.  It then uses AJV.js as it's schema
 * validator and uses additional logic as needed to validate statements against
 * the xAPI specification.
 * Schemas are found in `schemas` folder.
 * Example statements are found in `statements` folder.
 * Additional code is found in `lib` folder.
 */

(   // begin closure
function validator(module, es, pff, pss) {
// (module, es) => {    //weird, this line does not work, but the line above does
const fs = require('fs');
const args = process.argv;

console.log('Start validator.js');

// Make sure we have the filename
let filename;
// console.log(args);
if (args.length < 3) {
    filename = pff();
} else {
    filename = args[2];
}
console.log(filename);

// Now load and parse that file
// console.log('load and parse begin');
let stmts = [];
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.log('bad read of file');
        throw err;
    }
    console.log('read of file successful');
    let result = JSON.parse(data);
    // Convert to array format
    if (Array.isArray(result)) {
        stmts = result;
    } else {
        stmts.push(result);
    }
    // console.log('load and parse end');
    // console.log(`Parse of data successful.  We now have ${JSON.stringify(stmts, null, 3)}`);

    // Process these statements
    console.log('process statments begin');
    let res = [];
    for (const stmt of stmts) {
        console.log(`Look at this: ${stmt}`);
        pss(stmt, (err, data) => {
            if (err) throw err;
            // console.log(data);
            res.push(data);
        });
    }
    console.log(`Here are your results:\n ${res}`);
    console.log('process statments end');
    console.log('I win!!');
    console.log('Time to start again!');
    // don't uncomment until you have a way to stop or slow down the loop
    // validator(module, fs, pff, pss);
}); // end file read

}(module, require('fs'), require('./lib/promptForFile.js'), require('./lib/processStmt.js'))
);  // end closure
