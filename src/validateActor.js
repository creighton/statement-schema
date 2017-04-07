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
module.exports = function (actor, cb) {
    console.log(`validating actor: \n${JSON.stringify(actor)}`);
    // So here is my walk through
    const fs = require('fs');
    const V = require('ajv');
    const v = new V();
    // Pit the actor of the stmt againt the schema - also note this could be in the stmt schema
    // Get the value of objectType Group = valGroup, else = valAgent
    if (actor.objectType === "Group") {
        console.log('This actor is a group');
        if (actor.mbox || actor.mbox_sha1sum || actor.openid || actor.account) {
            console.log('This group is an identified group');
            fs.readFile('./test/schemas/idgroup.json', 'utf8', (err, schemaStr) => {
                if (err) throw err;
                let schema = JSON.parse(schemaStr);
                let valid = v.validate(schema, actor);
                // console.log(valid);
                if (!valid) {
                    // console.log(v.err);
                    // console.log(`This is the ajv instance:\n${Object.keys(v)}\n${JSON.stringify(v.errors)}\n${v.errorsText}`);
                    cb(null, v.errors);
                } else {
                    // console.log(`You win!! The statement begins valid:\n${valid}\n all done`);
                    cb(null, 'actor - identified group validated');
                }
            });
        } else {
            console.log('This group is an anonymous group');
            fs.readFile('./test/schemas/anongroup.json', 'utf8', (err, schemaStr) => {
                if (err) throw err;
                let schema = JSON.parse(schemaStr);
                let valid = v.validate(schema, actor);
                // console.log(valid);
                if (!valid) {
                    // console.log(v.err);
                    // console.log(`This is the ajv instance:\n${Object.keys(v)}\n${JSON.stringify(v.errors)}\n${v.errorsText}`);
                    cb(null, v.errors);
                } else {
                    // console.log(`You win!! The statement begins valid:\n${valid}\n all done`);
                    cb(null, 'actor - anonymous group validated');
                }
            });
        }
    } else {
        console.log('This actor is an agent');
        fs.readFile('./test/schemas/agent.json', 'utf8', (err, schemaStr) => {
            if (err) throw err;
            let schema = JSON.parse(schemaStr);
            let valid = v.validate(schema, actor);
            // console.log(valid);
            if (!valid) {
                // console.log(v.err);
                // console.log(`This is the ajv instance:\n${Object.keys(v)}\n${JSON.stringify(v.errors)}\n${v.errorsText}`);
                cb(null, v.errors);
            } else {
                // console.log(`You win!! The statement begins valid:\n${valid}\n all done`);
                cb(null, 'actor - agent validated');
            }
        });
    }

}
);  // end closure
