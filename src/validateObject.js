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
module.exports = function (object, cb) {
    console.log('validating object:', object);
    const V = require('ajv');
    const v = new V();
    // So here is my walk through
    // Pit the actor of the stmt againt the schema - also note this could be in the stmt schema
    // Get the value of objectType Group = valGroup, else = valAgent
    // Either way get those results and pass back through the cb
    // Also double check and make sure there is nothing being missed

    if (object.objectType === "SubStatement") {
        console.log('This object is a SubStatement');
        if (v.validate(require('../test/schemas/object-substatement.json'), object)) { return cb(null, 'object SubStatement - validated'); }
        return cb(null, 'object SubStatement - ' + v.errorsText());
    } else if (object.objectType === "StatementRef") {
        console.log('This object is a StatementRef');
        if (v.validate(require('../test/schemas/object-statementref.json'), object))
        { return cb(null, 'object StatementRef - validated'); }
        return cb(null, 'object StatementRef - ' + v.errorsText());
    } else if (object.objectType === "Agent") {
        console.log('This object is an Agent');
        if (v.validate(require('../test/schemas/agent.json'), object)) { return cb(null, 'object Agent - validated'); }
        return cb(null, 'object Agent - ' + v.errorsText());
    } else if (object.objectType === "Group") {
        console.log('This object is a Group');
        if (object.mbox || object.mbox_sha1sum || object.openid || object.account) {
            console.log('This group is identified');
            if (v.validate(require('../test/schemas/idgroup.json'), object)) { return cb(null, 'object Identified Group - validated'); }
            return cb(null, 'object Identified Group - ' + v.errorsText());
        } else {
            console.log('This group is anonymous');
            if(v.validate(require('../test/schemas/anongroup.json'), object)) { return cb(null, 'object Anonymous Group - validated'); }
            return cb(null, 'object Anonymous Group - ' + v.errorsText());
        }
    } else {    // From here we assume that objectType is either "Activity" or not defined which means the same
        console.log('This object is an Activity');
        // console.log(`Yoyo you have reached the object activity validation center the activity is ${object}`);
        if (v.validate(require('../test/schemas/object-activity.json'), object)) { return cb(null, 'object Activity - validated'); }
        return cb(null, 'object Activity - ' + v.errorsText());
    }

}
);  // end closure
