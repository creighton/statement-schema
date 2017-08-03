/**
 *
 */

(   // begin closure
    module.exports = function (stmt, cb) {
        console.log('processStmt');
        const async = require('async');
        let allErrors = [];

        async.series([
            // Validate against statement schema
            function (cb) {
                const vStmt = require('./validateStatement.js');
                vStmt(stmt, (err, data) => {
                    cb(err, data);
                });
            },
            // Walk through checking each statement property
            function (cb) {
                console.log('Statement id is : ', stmt.id);
                if (stmt.id) {
                    const vId = require('./validateId.js');
                    vId(stmt.id, (err, data) => {
                        cb(err, data);
                    });
                } else {
                    cb (null, 'id - not used')
                }
            },
            // next check for more in actor - call validateActor
            function (cb) {
                const vActor = require('./validateActor.js');
                vActor(stmt.actor, (err, data) => {
                    cb(err, data);
                });
            },
            // next check for more in verb - call validateVerb
            function (cb) {
                const vVerb = require('./validateVerb.js');
                vVerb(stmt.verb, (err, data) => {
                    cb(err, data);
                });
            },
            // next check for more in object - call validateObject
            function (cb) {
                console.log("Now time to Object");
                const vObject = require('./validateObject.js');
                vObject(stmt.object, (err, data) => {
                    cb(err, data);
                });
            },
            // next check for more in result - call validateResult
            // This will work for any particular optional property which needs additional help
            function (cb) {
                console.log('Is there a result?', stmt.result);
                if (stmt.result) {
                    console.log('there is a statement result property');
                    const vResult = require('./validateResult.js');
                    vResult(stmt.result, (err, data) => {
                        console.log('Data goes here: ', data);
                        cb(err, data);
                    });
                } else {
                    cb(null, 'result - not used');
                }
            },
            // next check for more in context - call validateContext
            function (cb) {
                console.log('Is there a context?', stmt.context);
                if (stmt.context) {
                    console.log('there is a statement context property');
                    const vContext = require('./validateContext.js');
                    vContext(stmt.context, (err, data) => {
                        console.log('Data goes here: ', data);
                        cb(err, data);
                    });
                } else {
                    cb(null, 'context - not used');
                }
            },
            // next check for more in timestamp - call validateTimestamp
            function (cb) {
                console.log('Is there a timestamp?', stmt.timestamp);
                if (stmt.timestamp) {
                    console.log('there is a statement timestamp property');
                    const vTimestamp = require('./validateTimestamp.js');
                    vTimestamp(stmt.timestamp, (err, data) => {
                        console.log('Data goes here: ', data);
                        cb(err, data);
                    });
                } else {
                    cb(null, 'timestamp - not used');
                }
            },
            // next check for more in stored - call validateStored
            function (cb) {
                console.log('Is there a stored?', stmt.stored);
                if (stmt.stored) {
                    console.log('there is a statement stored property');
                    const vStored = require('./validateStored.js');
                    vStored(stmt.stored, (err, data) => {
                        console.log('Data goes here: ', data);
                        cb(err, data);
                    });
                } else {
                    cb(null, 'result - not used');
                }
            },
            // next check for more in authority - call validateAuthority
            function (cb) {
                console.log('Is there an authority?', stmt.authority);
                if (stmt.authority) {
                    console.log('there is a statement authority property');
                    const vAuthority = require('./validateAuthority.js');
                    vAuthority(stmt.authority, (err, data) => {
                        console.log('Data goes here: ', data);
                        cb(err, data);
                    });
                } else {
                    cb(null, 'authority - not used');
                }
            },
            // next check for more in version - call validateVersion
            function (cb) {
                console.log('Is there a version?', stmt.version);
                if (stmt.version) {
                    console.log('there is a statement verison property');
                    const vVersion = require('./validateVersion.js');
                    vVersion(stmt.version, (err, data) => {
                        console.log('Data goes here: ', data);
                        cb(err, data);
                    });
                } else {
                    cb(null, 'version - not used');
                }
            },
            // next check for more in attachments - call validateAttachments
            function (cb) {
                console.log('Are there attachments?', stmt.attachments);
                if (stmt.attachments) {
                    console.log('there is a statement attachments property');
                    const vAttachments = require('./validateAttachments.js');
                    vAttachments(stmt.attachments, (err, data) => {
                        console.log('Data goes here: ', data);
                        cb(err, data);
                    });
                } else {
                    cb(null, 'attachments - not used');
                }
            },
        ], function (err, results) {
            cb(err, results);
        });
    }
);  // end closure
