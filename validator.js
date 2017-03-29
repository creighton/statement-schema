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
function(module, es, pff) {
// (module, es) => {    //weird, this line does not work, but the line above does
const fs = require('fs');
const args = process.argv;

console.log('Start validator.js');

// Make sure we have the filename
let filename;
console.log(args);
if (args.length < 3) {
    filename = pff();
} else {
    filename = args[2];
}
console.log(filename);

// Now load and parse that file
console.log('load and parse begin');
let stmts = [];
stmts = fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.log('bad read of file');
        throw err;
    }
    console.log('read of file successful');
    stmts = JSON.parse(data);
    console.log(`Parse of data successful.  We now have ${stmts}`);
});
console.log('load and parse end');

console.log('I win!!');
}(module, require('fs'), require('./lib/promptForFile'))
);  // end closure
