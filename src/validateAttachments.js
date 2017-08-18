/**
 * The attachment schema.
 *
 */

(   //begin closure
module.exports = function (attachments, cb) {
    // console.log(`validating attachments: \n${JSON.stringify(attachments)}`);
    // So here is my walk through
    const fs = require('fs');
    const V = require('ajv');
    const v = new V();

    let str = __dirname;
    str = str.replace('src', 'test/schemas/attachments');

    let valid = v.validate(require(str), attachments);

    if (!valid) {
        cb(null, 'attachments errors - ' + v.errorsText());
    } else {
        cb(null, 'attachments - validated');
    }
}
);  // end closure
