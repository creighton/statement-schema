/**
 * The Stored Schema is a timestamp.  It is to be set by the LRS anytime that
 * the LRS receives a statement.  LRPs are not to set the stored property.  LRSs
 * though are still to check the stored property and accept the statement and
 * overwirte the stored property, to allow for exchange of data between LRSs.
 * The Stored property timestamp is to be in ISO 8601 format.
 *
 */

(   //begin closure
module.exports = function (stored, cb) {
    // console.log(`validating stored: \n${JSON.stringify(stored)}`);

    const V = require('ajv');
    const v = new V();
    const mo = require('moment');
    let msg = 'WARNING: Stored property is to be set by LRS, not LRP.';

    let str = __dirname;
    str = str.replace('src', 'test/schemas/timestamp');

    let valid = v.validate(require(str), stored);

    if (valid) {
        let m = mo(stored.toUpperCase(), mo.ISO_8601, true);
        if (m.isValid()) {
            msg += '\n\tstored - validated';
        } else {
            msg += `\n\tstored error - not formatted according to ISO 8601`;
        }
    } else {
        msg += `\n\tstored error - ${v.errorsText()}`;
    }

    cb(null, msg);
}
);  // end closure
