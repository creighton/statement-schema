/**
 * The verb schema
 *
 */

(   //begin closure
module.exports = function (verb, cb) {
    // console.log(`validating verb: \n${JSON.stringify(verb)}`);
    // So here is my walk through
    const fs = require('fs');
    const V = require('ajv');
    const v = new V();

    let str = __dirname;
    str = str.replace('src', 'test/schemas/verb');

    let valid = v.validate(require(str), verb);

    if (!valid) {
        cb(null, 'verb errors - ' + v.errorsText());
    } else {
        cb(null, 'verb - validated');
    }
}
);  // end closure
