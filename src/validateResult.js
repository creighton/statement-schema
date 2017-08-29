/**
 * The result schema.
 *
 */

(   //begin closure
    module.exports = function (result, cb) {
        // console.log('validating result', result);
        const V = require('ajv');
        const v = new V();

        let str = __dirname;
        str = str.replace('src', 'test/schemas/result.json');

        if (v.validate(require(str), result)) {
            if (result.score && result.score.raw) {
                if (result.score.max && result.score.raw > result.score.max) {
                    return cb(null, `result.score error - no good raw (${result.score.raw}) is larger than max (${result.score.max})`)
                }
                if (result.score.min && result.score.raw < result.score.min) {
                    return cb(null, `result.score error - no good raw (${result.score.raw}) is smaller than min (${result.score.min})`)
                }
            }
            return cb(null, 'result - validated')
        }
        cb(null, 'result error - ' + v.errorsText());
    }
);  // end closure
