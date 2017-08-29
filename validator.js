/**
 * Well this is what i've learned - not that async ruins everything, but that
 * async needs to be accounted for.  At this point I'm going to chase the rabbit
 * rather than use async series, but that is always an option for later. This
 * is going to be an adventure.
 * This is the main program for validating xAPI statements from the command
 * line.  It takes a filename as a command line argument as the statement or
 * array of statements to be verified.  It then uses AJV.js as it's schema
 * validator and uses additional logic as needed to validate statements against
 * the xAPI specification.
 * Schemas are found in `schemas` folder.
 * Example statements are found in `statements` folder.
 * Additional code is found in `src` folder.
 */

(   // begin closure
function validator(module, pff, getAll, getFolder, parseFiles, formatMessage) {

    const args = process.argv;

    console.log('\nStart validator.js\n\n\n');

    // Make sure we have the filename
    let filenames = [];
    // Set the default
    let verbose = false;
    for (arg in args) {
        if (args[arg] === '-v') {
            verbose = true;
        }
    }
    // console.log(args, args.length, verbose);
    if (args.length < 3) {
        pff((err, data, filename) => {
            if (verbose) {
                console.log(`\n\nThank you please come  again.\n${formatMessage(err || data, filename)}`);
            } else {
                console.log(`${filename}: ${data.join().includes('error') ? 'fail' : 'pass'}\n`);
            }
        });
    } else if (args[2] === '-a') {
        getAll((err, data, filename) => {
            if (verbose) {
                console.log(`\n\nHello again.\n${formatMessage(err || data, filename)}`);
            } else {
                console.log(`${filename}: ${data.join().includes('error') ? 'fail' : 'pass'}\n`);
            }
        });
    } else if (args[2] === '-f') {
        getFolder(args[3], (err, data, filename) => {
            let names = `${filename} in ${args[3]}`;
            if (verbose) {
                console.log(`\n\nCiao!\n${formatMessage(err || data, names)}`);
            } else {
                console.log(`${filename}: ${data.join().includes('error') ? 'fail' : 'pass'}\n`);
            }
        });
    } else {
        filenames.push(args[2]);
        parseFiles(filenames, (err, data, filename) => {
            if (verbose) {
                console.log(`\n\nWelcome back.\n${formatMessage(err || data, filename)}`);
            } else {
                console.log(`${filename}: ${data.join().includes('error') ? 'fail' : 'pass'}\n`);
            }
        })
    }

}(module, require('./src/promptForFile.js'), require('./src/allStmts.js'), require('./src/getFolder.js'), require('./src/parseFiles.js'), require('./src/formatMessage'))
);  // end closure
