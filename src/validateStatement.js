/**
 * The statement schema has been stripped down to simply validate that allowed
 * properties are of the correct type.
 *
 */

(   //begin closure
module.exports = function (stmt, cb) {
    // console.log('validating statement');
    const fs = require('fs');
    const V = require('ajv');
    const v = new V({"format":"full"});

    let str = __dirname;
    str = str.replace('src', 'test/schemas/statement.json');

    let valid = v.validate(require(str), stmt);
    if (!valid) {
        cb(null, 'statement error - ' + v.errorsText());
    } else {
        cb(null, 'statement - general structure validated');
    }
}
);  // end closure
