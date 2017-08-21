/**
 * The authority schema
 *
 */

(   //begin closure
module.exports = function (authority, cb) {
    // console.log(`validating authority: \n${JSON.stringify(authority)}`);
    // So here is my walk through
    const fs = require('fs');
    const V = require('ajv');
    const v = new V();

    let str = __dirname;
    let msg = 'WARNING: Authority is to be set by the LRS, not LRP.  If an LRS receives a statement with the authority property set, the LRS should overwrite it.';
    str = str.replace('src', 'test/schemas/');

    if (authority.objectType && authority.objectType === "Group") {
        let valid = v.validate(require(str + 'anongroup'), authority);

        if (!valid) {
            msg += '\n\tauthority errors - ' + v.errorsText();
        } else {
            msg += '\n\tauthority Anonymous Group - validated';
        }
        // items in a member array must validate as agents
        if (authority.member) {
            for (let act of authority.member) {
                if (v.validate(require(str + 'agent'), act)) {
                    msg += `\n\t\tgroup member ${act.name} - is a valid agent`;
                }
                else {
                    msg += `\n\t\tgroup member ${JSON.stringify(act)} - is not a valid agent\n\t\t${v.errorsText()}`;
                }
            }
        }
    } else {    // the authority must be an agent
        let valid = v.validate(require(str + 'agent'), authority);

        if (!valid) {
            msg += '\n\tauthority errors - ' + v.errorsText();
        } else {
            msg += '\n\tauthority Agent - validated';
        }
    }
    cb(null, msg);
}
);  // end closure
