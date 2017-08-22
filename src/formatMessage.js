/**
 * This function takes an array of messages from the validating functions and formats it and sends it to the console.
 */

(   // begin closure
    module.exports = function (messages, filename) {
        console.log('formatMessage ' + filename);
        let str = `\nThe results of validating the ${filename} statement are:\n`;

        for (const msg of messages) {
            if (typeof msg === 'string') {
                str += '\n\t' + msg;
            } else if (msg) {
                for (const m of msg) {
                    str += '\n\t' + JSON.stringify(m.message);
                }
            }
        }

        return str + '\n\n';
    }
);  // end closure
