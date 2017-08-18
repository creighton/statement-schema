/**
 * The id should be set by the LRP, however if it is not it must be set by the
 * LRS. The id is to be a uuid according to RFC 4122.  Variant 2 is recommended.
 *
 */

(   //begin closure
module.exports = function (id, cb) {
    // console.log(`validating id: \n${JSON.stringify(id)}`);

    const V = require('ajv');
    const v = new V();

    let str = __dirname;
    str = str.replace('src', 'test/schemas/id');

    let valid = v.validate(require(str), id);
    if (!valid) {
        cb(null, 'id errors - ' + v.errorsText());
    } else {
        cb(null, 'id - validated');
    }

}
);  // end closure
