/**
 * The authority schema
 *
 */

(   //begin closure
module.exports = function (authority, cb) {
    // console.log(`validating authority: \n${JSON.stringify(authority)}`);
    // So here is my walk through
    const fs = require('fs');
    const V = require('ajv');
    const v = new V();

    let str = __dirname;
    let msg = 'WARNING: Authority is to be set by the LRS, not LRP.  If an LRS receives a statement with the authority property set, the LRS should overwrite it.';

    if (authority.objectType && authority.objectType === "Group") {
        str = str.replace('src', 'test/schemas/idgroup');
        let valid = v.validate(require(str), authority);

        if (!valid) {
            msg += '\n\tauthority errors - ' + v.errorsText();
        } else {
            msg += '\n\tauthority - validated';
        }
    } else {    // the authority must be an agent
        str = str.replace('src', 'test/schemas/agent');
        let valid = v.validate(require(str), authority);

        if (!valid) {
            msg += '\n\tauthority errors - ' + v.errorsText();
        } else {
            msg += '\n\tauthority - validated';
        }
    }
    cb(null, msg);
}
);  // end closure
