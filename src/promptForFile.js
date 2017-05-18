/**
 *
 */

(   // begin closure
    module.exports = function (cb) {
        console.log('promptForFile');
        const parseFiles = require('./parseFiles.js');


        const readline = require('readline');

        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl.question('Enter path and filename: ', (answer) => {
          // TODO: Log the answer in a database
          console.log(`Thank you for your valuable feedback: ${typeof answer}`);
console.log(answer);
          rl.close();
          parseFiles([answer] || ['various.json'], cb);
        });



        // cb(null, ['statements/various.json']);
    }
);  // end closure
