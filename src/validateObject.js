/**
 * The object schema has difficulty with distinguishing between agents, and id'd
 * groups since both can use the same keys.  This code will assist in validating
 * by comparing the values of those properties and applying rules which the
 * schema cannot.  The object schema also has to search for differing types of
 * objects statementRef, substatement, and activity, therefore those schemas
 * are broken into individual schemas which can be reused by other properties,
 * and the logic to distinguish between object types is carried out here.
 *
 */

(   //begin closure
module.exports = function (object, cb) {
    // console.log('validating object:', object);
    const V = require('ajv');
    const v = new V();

    let msg = '';
    let str = __dirname;
    str = str.replace('src', 'test/schemas/');

    // test for substatement objectType
    if (object.objectType === "SubStatement") {
        // console.log('This object is a SubStatement');
        // must have and actor verb and object
        if (!(object.actor && object.verb && object.object)) {
            // console.log('Not Enough');
            return cb(null, 'object SubStatement error - does not contain an actor, verb and object');
        }
        // can not contain a substatement of its own
        if (object.object.objectType === 'SubStatement') {
            // console.log('Not Again');
            return cb(null, 'object SubStatement error - a substatement MUST NOT contain a substatement of its own');
        }
        // check for forbidden substatement properties
        if (object.id || object.stored || object.version || object.authority) {
            // console.log('Too Much');
            return cb(null, 'object SubStatement error - a substatement MUST NOT have the "id", "stored", "version" or "authority" properties');
        }
        //We got this far, now clone the substatement minus the objectType property, and process it
        var subs = {};
        for (key in object) {
            // a substatement will have an objectType property whereas a statement will not, so we look for it and skip it while keeping all the other available properties
            if (key !== "objectType") {
                subs[key] = object[key];
            }
        }
        const processStmt = require('./processStmt');
        processStmt(subs, 'processing substatment', function (err, res) {
            if (err) throw err;
            return cb(null, 'object SubStatement - \n\t\t' + res)
        });

    } else if (object.objectType === "StatementRef") {
        // console.log('This object is a StatementRef');
        if (v.validate(require(str + 'object-statementref.json'), object))
        { return cb(null, 'object StatementRef - validated'); }
        return cb(null, 'object StatementRef error - ' + v.errorsText());

        // in an object an agent must have an objectType of Agent
    } else if (object.objectType === "Agent") {
        // console.log('This object is an Agent');
        if (v.validate(require(str + 'agent.json'), object)) { return cb(null, 'object Agent - validated'); }
        return cb(null, 'object Agent error - ' + v.errorsText());

    } else if (object.objectType === "Group") {
        // console.log('This object is a Group');
        if (object.mbox || object.mbox_sha1sum || object.openid || object.account) {
            // console.log('This group is identified');
            if (v.validate(require(str + 'idgroup.json'), object)) {
                msg += 'object Identified Group - validated';
            } else {
                msg += 'object Identified Group error - ' + v.errorsText();
            }
        } else {
            // console.log('This group is anonymous');
            if(v.validate(require(str + 'anongroup.json'), object)) {
                msg += 'object Anonymous Group - validated';
            } else {
                msg += 'object Anonymous Group error - ' + v.errorsText();
            }
        }
        // items in a member array must validate as agents
        if (object.member) {
            for (let act of object.member) {
                if (v.validate(require(str + 'agent'), act)) {
                    msg += `\n\t\tgroup member ${act.name} - is a valid agent`;
                }
                else {
                    msg += `\n\t\tgroup member ${JSON.stringify(act)} error - is not a valid agent\n\t\t${v.errorsText()}`;
                }
            }
        }
        return cb(null, msg)
    } else {    // From here we assume that objectType is either "Activity" or not defined which means the same
        // console.log('This object is an Activity');
        if (v.validate(require(str + 'object-activity.json'), object)) { return cb(null, 'object Activity - validated'); }
        return cb(null, 'object Activity error - ' + v.errorsText());
    }

}
);  // end closure
