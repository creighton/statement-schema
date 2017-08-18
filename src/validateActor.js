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
    // console.log(`validating actor: \n${JSON.stringify(actor)}`);
    // So here is my walk through
    const fs = require('fs');
    const V = require('ajv');
    const v = new V();

    let msg = '';
    let str = __dirname;
    str = str.replace('src', 'test/schemas/');

    // Pit the actor of the stmt againt the schema - also note this could be in the stmt schema
    // Get the value of objectType Group = valGroup, else = valAgent
    if (actor.objectType === "Group") {
        // console.log('This actor is a group');
        if (actor.mbox || actor.mbox_sha1sum || actor.openid || actor.account) {
            // console.log('This group is an identified group');
            if (v.validate(require(str + 'idgroup'), actor)) {
                msg += 'actor Identified Group - validated';
            } else {
                msg += 'actor Identified Group - ' + v.errorsText();
            }
        } else {
            // console.log('This group is an anonymous group');
            if (v.validate(require(str + 'anongroup.json'), actor)) {
                msg += 'actor Anonymous Group - validated';
            } else {
                msg += 'actor Anonymous Group - ' + v.errorsText();
            }
        }
        // items in a member array must validate as agents
        if (actor.member) {
            for (let act of actor.member) {
                if (v.validate(require(str + 'agent'), act)) {
                    msg += `\n\t\tgroup member - all members are valid agents\n${JSON.stringify(act)}`;
                }
                else {
                    msg += `\n\t\tgroup member - one or more members is not a valid agent\n${v.errorsText()}`;
                }
            }
        }
    } else {
        // console.log('This actor is an agent');
        if (v.validate(require(str + 'agent'), actor)) {
            msg += 'actor Agent - validated';
        } else {
            msg += 'actor Agent - ' + v.errorsText();
        }
    }
    cb(null, msg);
}
);  // end closure
