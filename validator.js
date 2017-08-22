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

    console.log('Start validator.js\n\n\n');

    // Make sure we have the filename
    let filenames = [];
    // console.log(args);
    if (args.length < 3) {
        pff((err, data, filename) => {
            // if (err) throw err;
            console.log(`\n\nThank you please come again.\n${formatMessage(err || data, filename)}`);
        });
    } else if (args[2] === '-a') {
        getAll((err, data, filename) => {
            // if (err) throw err;
            console.log(`\n\nHello again.\n${formatMessage(err || data, filename)}`);
        });
    } else if (args[2] === '-f') {
        getFolder(args[3], (err, data, filename) => {
            let names = `${filename} in ${args[3]}`;
            console.log(`\n\nCiao!\n${formatMessage(err || data, names)}`);
        });
    } else {
        filenames.push(args[2]);
        parseFiles(filenames, (err, data, filename) => {
            // if (err) throw err;
            console.log(`\n\nWelcome back.\n${formatMessage(err || data, filename)}`);
        })
    }
    // console.log('reminder async, this will not have a value until much later', filenames);
    // console.log('Go on to that great beyond where everything will be taken care of');

}(module, require('./src/promptForFile.js'), require('./src/allStmts.js'), require('./src/getFolder.js'), require('./src/parseFiles.js'), require('./src/formatMessage'))
);  // end closure
