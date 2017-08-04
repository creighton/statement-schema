/**
 * The actor schema has difficulty with distinguishing between agents, and id'd
 * groups since both can use the same keys.  This code will assist in validating
 * by comparing the values of those properties and applying rules which the
 * schema cannot.
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
        msg += '\n\tversion errors - ' + v.errorsText();
    } else {
        msg += '\n\tversion - validated';
    }
    cb(null, msg);
}
);  // end closure
