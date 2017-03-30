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
    console.log('validating object');
    // So here is my walk through
    // Pit the actor of the stmt againt the schema - also note this could be in the stmt schema
    // Get the value of objectType Group = valGroup, else = valAgent
    // Either way get those results and pass back through the cb
    // Also double check and make sure there is nothing being missed
    cb(null, 'object validated');
}
);  // end closure
