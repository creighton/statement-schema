/**
 *
 */

(   // begin closure
    module.exports = function (stmt, cb) {
        console.log('processStmt');
        const async = require('async');

        async.series([
            // Validate against statement schema
            function (cb) {
                const vStmt = require('./validateStatement.js');
                vStmt(stmt, (err, data) => {
                    if (err) cb(err);
                    console.log(data);
                    cb();
                });
            },
            // next check for more in actor - call validateActor
            function (cb) {
                const vActor = require('./validateActor.js');
                vActor(stmt.actor, (err, data) => {
                    if (err) cb(err);
                    console.log(data);
                    cb();
                });
            },
            // next check for more in object - call validateObject
            function (cb) {
                const vObject = require('./validateObject.js');
                vObject(stmt.object, (err, data) => {
                    if (err) cb(err);
                    console.log(data);
                    cb();
                });
            },
            // This will work for any particular optional property which needs additional help
            function (cb) {
                if (stmt.result) {
                    console.log('there is a statement result property');
                    const vResult = require('./validateResult.js');
                    vResult(stmt.result, (err, data) => {
                        console.log(data);
                        cb(err);
                    });
                } else {
                    cb();
                }
            },
        ], function (err, results) {
            // Walkthrough of how to go about
            // do we need more for result - call validateResult
            // do we need more for context - call validateContext
            // do we need more for attachments - call validateAttachments
            // do we need anything else??
            if (err) throw err;
            cb(null, 'statement is fully validated');
        });
    }
);  // end closure
