/**
 *
 */

(   // begin closure
    module.exports = function (cb) {
        // console.log('promptForFile');
        const parseFiles = require('./parseFiles.js');


        const readline = require('readline');

        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl.question('Enter filename: ', (answer) => {
          rl.close();
          parseFiles([answer] || ['various.json'], cb);
        });



        // cb(null, ['statements/various.json']);
    }
);  // end closure
