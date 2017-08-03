/**
 * The authority schema
 *
 * I'm thinking maybe have a good base schema that checks that only keys of
 *  objectType, name, ifi, and member exist, then read the value of objectType
 *  if it exists, and test against agent or group schema as needed.  That might
 *  be all that is needed.
 * The new schema, "actorANG.json", validates only that there is an actor object
 *  and that it contain no other properties other than those specifically
 *  allowed. Further testing for duplicate keys, and appropriate keys against
 *  agent or group schemas, and stronger type testing.
 *
 */

(   //begin closure
module.exports = function (authority, cb) {
    console.log(`validating authority: \n${JSON.stringify(authority)}`);
    // So here is my walk through
    const fs = require('fs');
    const V = require('ajv');
    const v = new V();

    let str = __dirname;
    let msg = 'WARNING: Authority is to be set by the LRS, not LRP.  If an LRS receives a statement with the authority property set, the LRS should overwrite it.';

    if (authority.objectType && authority.objectType === "Group") {
        str = str.replace('src', 'test/schemas/idgroup');
        let valid = v.validate(require(str), authority);
        console.log(valid);
        if (!valid) {
            msg += '\n\tauthority errors - ' + v.errorsText();
        } else {
            msg += '\n\tauthority - validated';
        }
    } else {    // the authority must be a group
        str = str.replace('src', 'test/schemas/agent');
        let valid = v.validate(require(str), authority);
        console.log(valid);
        if (!valid) {
            msg += '\n\tauthority errors - ' + v.errorsText();
        } else {
            msg += '\n\tauthority - validated';
        }
    }
    cb(null, msg);
}
);  // end closure
