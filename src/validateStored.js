/**
 * The Stored Schema is a timestamp.  It is to be set by the LRS anytime that
 * the LRS receives a statement.  LRPs are not to set the stored property.  LRSs
 * though are still to check the stored property and accept the statement and
 * overwirte the stored property, to allow for exchange of data between LRSs.
 * The Stored property timestamp is to be in ISO 8601 format and maintain a
 * minimum precision to milliseconds.
 *
 */

(   //begin closure
module.exports = function (stored, cb) {
    console.log(`validating stored: \n${JSON.stringify(stored)}`);

    const fs = require('fs');
    const milliCheck = require('./milliCheck');
    const V = require('ajv');
    const v = new V();
    let msg = 'WARNING: Stored property is to be set by LRS, not LRP.';


// note casting to date still leaves some imprecision - ie 2017-02-31 gets cast to 2017-03-03 rather than invalid
    if (typeof stored === 'string') {
        let ts = new Date(stored);
        if (!isNaN(ts) && (ts.toISOString() === stored.toUpperCase())) {
            msg += '\n\tstored - validated.'
            if (!milliCheck(ts)) {
                msg += '\n\t WARNING: The value of milliseconds was equal to zero. Please ensure recording of times and preserving of precision to milliseconds.'
            }
        } else {
            msg += `\n\tstored errors - data is not a valid ISO8601 date-time format.`;
            if (!JSON.stringify(ts)) {
                msg += `\n\t${ts.toISOString()} was expected\n\t${stored} was actual`;
            }
        }
    } else {
        msg += 'stored errors - data is not a string.';
    }
    cb(null, msg);

/*  json schema even with date-time format is less precise than using new Date(timestamp) and expecting either null or a valid time object
    let str = __dirname;
    str = str.replace('src', 'test/schemas/timestamp');

    let valid = v.validate(require(str), stored);
    if (!valid) {
        msg += 'stored errors - ' + v.errorsText();
    } else {
        msg += 'stored - validated';
    }
*/

}
);  // end closure
