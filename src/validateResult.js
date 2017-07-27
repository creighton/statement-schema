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
    module.exports = function (result, cb) {
        console.log('validating result', result);
        const V = require('ajv');
        const v = new V();

        let str = __dirname;
        str = str.replace('src', 'test/schemas/result.json');

        if (v.validate(require(str), result)) {
            if (result.score && result.score.raw) {
                if (result.score.max && result.score.raw > result.score.max) {
                    return cb(null, `result - no good raw (${result.score.raw}) is larger than max (${result.score.max})`)
                }
                if (result.score.min && result.score.raw < result.score.min) {
                    return cb(null, `result - no good raw (${result.score.raw}) is smaller than min (${result.score.min})`)
                }
            }
            return cb(null, 'result - validated')
        }
        cb(null, 'result - ' + v.errorsText());
    }
);  // end closure
