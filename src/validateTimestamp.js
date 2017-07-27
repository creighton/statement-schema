/**
 * The Timestamp Schema is a timestamp.  It is recommended to be set by the
 * LRP.  And if missing must be set by the LRS to match the timestamp time.
 * The Timestamp property timestamp is to be in ISO 8601 format and maintain a
 * minimum precision to milliseconds.
 *
 */


(   //begin closure
module.exports = function (timestamp, cb) {
    console.log(`validating timestamp: \n${JSON.stringify(timestamp)}`);
    // So here is my walk through
    const fs = require('fs');
    const milliCheck = require('./milliCheck');
    const V = require('ajv');
    const v = new V();
    let msg = '';

    // note casting to date still leaves some imprecision - ie 2017-02-31 gets cast to 2017-03-03 rather than invalid
    if (typeof timestamp === 'string') {
        let ts = new Date(timestamp);
        if (!isNaN(ts) && (ts.toISOString() === timestamp.toUpperCase())) {
            msg += 'timestamp - validated.'
            if (!milliCheck(ts)) {
                msg += '\n\t WARNING: The value of milliseconds was equal to zero. Please ensure recording of dates and preserving of precision to milliseconds.'
            }
        } else {
            msg += `timestamp errors - data is not a valid ISO8601 date-time format.`;
            if (!JSON.stringify(ts)) {
                msg += `\n\t${ts.toISOString()} was expected\n\t${stored} was actual`;
            }
        }
    } else {
        msg += 'timestamp errors - data is not a string.';
    }
    cb(null, msg);

/*
    let str = __dirname;
    str = str.replace('src', 'test/schemas/timestamp');

    let valid = v.validate(require(str), timestamp);
    console.log(valid);
    if (!valid) {
        cb(null, 'timestamp errors - ' + v.errorsText());
    } else {
        cb(null, 'timestamp - validated');
    }
*/

}
);  // end closure
