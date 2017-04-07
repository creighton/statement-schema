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
    console.log('validating object', object);
    const V = require('ajv');
    const v = new V();
    // So here is my walk through
    // Pit the actor of the stmt againt the schema - also note this could be in the stmt schema
    // Get the value of objectType Group = valGroup, else = valAgent
    // Either way get those results and pass back through the cb
    // Also double check and make sure there is nothing being missed

    if (object.objectType === "SubStatement") {
        console.log('This object is an SubStatement');
        if (v.validate(require('../test/schemas/object-substatement.json')), object) { return cb(null, 'object - SubStatement validated'); }
        return cb(null, v.errors);
    } else if (object.objectType === "StatementRef") {
        console.log('This object is an StatementRef');
        if (v.validate(require('../test/schemas/object-statementref.json')), object) { return cb(null, 'object - StatementRef validated'); }
        return cb(null, v.errors);
    } else if (object.objectType === "Agent") {
        console.log('This object is an Agent');
        if (v.validate(require('../test/schemas/object-agent.json')), object) { return cb(null, 'object - Agent validated'); }
        return cb(null, v.errors);
    } else if (object.objectType === "Group") {
        console.log('This object is an Group');
        if (v.validate(require('../test/schemas/object-group.json')), object) { return cb(null, 'object - Group validated'); }
        return cd(null, v.errors);
    } else {    // From here we assume that objectType is either "Activity" or not defined which means the same
        console.log('This object is an Activity');
        // console.log(`Yoyo you have reached the object activity validation center the activity is ${object}`);
        if (v.validate(require('../test/schemas/object-activity.json'), object)) { return cb(null, 'object - Activity validated'); }
        return cb(null, v.errors);
    }
    
}
);  // end closure
