/**
 * The Timestamp Schema is a timestamp.  It is recommended to be set by the
 * LRP.  And if missing must be set by the LRS to match the timestamp time.
 * The Timestamp property timestamp is to be in ISO 8601 format.
 *
 */


(   //begin closure
module.exports = function (timestamp, cb) {
    // console.log(`validating timestamp: \n${JSON.stringify(timestamp)}`);
    // So here is my walk through
    const V = require('ajv');
    const v = new V();
    const mo = require('moment');
    let msg = '';

    let str = __dirname;
    str = str.replace('src', 'test/schemas/timestamp');

    let valid = v.validate(require(str), timestamp);

    if (valid) {
        let m = mo(timestamp.toUpperCase(), mo.ISO_8601, true);
        if (m.isValid()) {
            msg += 'timestamp - validated';
        } else  {
            msg += `timestamp error - not formatted accoring to ISO 8601`;
        }
    } else {
        msg += `timestamp error - ${v.errorsText()}`;
    }

    cb(null, msg);

}
);  // end closure
