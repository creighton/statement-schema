/**
 * The context schema.
  *
 */

(   //begin closure
module.exports = function (context, objectObjectType, cb) {
    // console.log(`validating context: \n${JSON.stringify(context)}`);
    // So here is my walk through
    const fs = require('fs');
    const V = require('ajv');
    const v = new V();

    let msg = '';
    let str = __dirname;
    str = str.replace('src', 'test/schemas/');

    let valid = v.validate(require(str + 'context'), context);

    if (!valid) {
        msg += 'context error - ' + v.errorsText();
    } else {
        msg += 'context - validated';
    }
    // Additional testing for revision and platform which requires the object's object type to be an activity
    // Are revision or platform being used, if so is object objectType an activity - okay; otherwise error
    // console.log(`\n${}\t${}\t${}\t${}\n`);
    if (context.revision || context.platform) {
        if (!objectObjectType || objectObjectType === 'Activity') {
            msg += `\n\t\trevision and platform - validated`;
        } else {
            msg += `\n\t\trevision and platform error - must only be used if the statement's object is an activity`;
        }
    }
    // additional testing for intructor and team because of agent/group difficulties
    if (context.instructor) {
        let instrPath = str;
        if (context.instructor.objectType === 'Group') {
            // verifiy identified group
            if (context.instructor.mbox || context.instructor.mbox_sha1sum || context.instructor.openid || context.instructor.account) {
                instrPath += 'idgroup';
                msg += '\n\t\tinstructor Identified Group '
            } else {    // verify anonymous group
                instrPath += 'anongroup';
                msg += '\n\t\tinstructor Anonymous Group '
            }
            // items in a member array must validate as agents
            if (context.instructor.member) {
                for (let act of context.instructor.member) {
                    if (v.validate(require(str + 'agent'), act)) {
                        msg += `\n\t\tgroup member ${act.name} - is a valid agent`;
                    }
                    else {
                        msg += `\n\t\tgroup member ${JSON.stringify(act)} error - is not a valid agent\n\t\t${v.errorsText()}`;
                    }
                }
            }
        } else {    // verify agent
            instrPath += 'agent';
            msg += '\n\t\tinstructor Agent '
        }
        let okay = v.validate(require(instrPath), context.instructor);
        if (!okay) {
            msg += `error - ${v.errorsText()}`;
        } else {
            msg += '- validated';
        }
    }
    if (context.team) {
        let teamPath = str;
        if (context.team.mbox || context.team.mbox_sha1sum || context.team.openid || context.team.account) {
            teamPath += 'idgroup';
            msg += '\n\t\tteam Identified Group '
        } else {
            teamPath += 'anongroup';
            msg += '\n\t\tteam Anonymous Group '
        }
        // items in a member array must validate as agents
        if (context.team.member) {
            for (let act of context.team.member) {
                if (v.validate(require(str + 'agent'), act)) {
                    msg += `\n\t\tgroup member ${act.name} - is a valid agent`;
                }
                else {
                    msg += `\n\t\tgroup member ${JSON.stringify(act)} error - is not a valid agent\n\t\t${v.errorsText()}`;
                }
            }
        }
        let check = v.validate(require(teamPath), context.team);
        if (!check) {
            msg += `error - ${v.errorsText()}`;
        } else {
            msg += '- validated';
        }
    }

    cb(null, msg);
}
);  // end closure
