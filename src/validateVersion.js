/**
 * The version schema.
 *
 */

(   //begin closure
module.exports = function (version, cb) {
    // console.log(`validating version: \n${JSON.stringify(version)}`);
    // So here is my walk through
    const fs = require('fs');
    const V = require('ajv');
    const v = new V();

    let msg = 'WARNING: Version property to be set by LRS, not LRP.  If version property is set by LRP it must be "1.0.0".  The patch version can be determined by the "X-Experience-API-Version header."'
    let str = __dirname;
    str = str.replace('src', 'test/schemas/version');

    let valid = v.validate(require(str), version);

    if (!valid) {
        msg += '\n\tversion error - ' + v.errorsText();
    } else {
        msg += '\n\tversion - validated';
    }
    cb(null, msg);
}
);  // end closure
