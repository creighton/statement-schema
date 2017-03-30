/**
 *
 */

(   // begin closure
module.exports = function (stmt, cb) {
    console.log('processStmt');
    // Walkthrough of how to go about
    // Validate against statement schema
    const vStmt = require('./validateStatement.js');
    vStmt(stmt, (err, data) => {
        if (err) throw err;
        console.log(data);
    })
    // next check for more in actor - call validateActor
    const vActor = require('./validateActor.js');
    vActor(stmt.actor, (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    // next check for more in object - call validateObject
    const vObject = require('./validateObject.js');
    vObject(stmt.object, (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    // do we need more for result - call validateResult
    // do we need more for context - call validateContext
    // do we need more for attachments - call validateAttachments
    // do we need anything else??
    cb(null, 'statement fully validated');

}
);  // end closure
