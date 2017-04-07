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
                    // if (err) {
                    //     console.log(`Hey there's an error: ${JSON.stringify(err)}`);
                    //     for(const e of err) {
                    //         allErrors.push(e)
                    //     }
                    //     console.log(JSON.stringify(allErrors));
                    // }
                    // console.log(`This is the statement data:\n ${data}\nAnd this is the error message:\n ${allErrors}`);
                    cb(err, data);
                });
            },
            // next check for more in actor - call validateActor
            function (cb) {
                const vActor = require('./validateActor.js');
                vActor(stmt.actor, (err, data) => {
                    // if (err) {
                    //     console.log(`Please be advised there is a problem with your actor:\n${JSON.stringify(err)}`);
                    //     for(const e of err) {
                    //         allErrors.push(e)
                    //     }
                    // }
                    // console.log(`This is the actor data:\n ${JSON.stringify(data)}\nAnd this is now the error message:\n ${allErrors}`);
                    // console.log(data);
                    // cb(err, data);
                    cb(err, data);
                });
            },
            // next check for more in object - call validateObject
            function (cb) {
                console.log("Now time to Object");
                const vObject = require('./validateObject.js');
                vObject(stmt.object, (err, data) => {
                    // if (err) {
                    //     // console.log(`This is the object data:\n ${data}\nAnd this now is the error message:\n ${allErrors}`);
                    //     for(const e of err) {
                    //         allErrors.push(e)
                    //     }
                    // }
                    // console.log(data);
                    cb(err, data);
                });
            },
            // This will work for any particular optional property which needs additional help
            function (cb) {
                console.log('Is there a result?', stmt.result);
                if (stmt.result) {
                    console.log('there is a statement result property');
                    const vResult = require('./validateResult.js');
                    vResult(stmt.result, (err, data) => {
                        // console.log(`This is the result data:\n ${data}\nAnd this is now the error message:\n ${allErrors}`);
                        // console.log(data);
                        if (err) {
                            for(const e of err) {
                                allErrors.push(e)
                            }
                        }
                        cb(err);
                    });
                } else {
                    cb();
                }
            },
        ], function (err, results) {
            // console.log(`What is the value of allErrors:\n${allErrors}\n.vs results\n${results}`);
            // console.log(`allErrors is ${typeof allErrors}\nresults is ${typeof results}`);
            // Walkthrough of how to go about
            // do we need more for result - call validateResult
            // do we need more for context - call validateContext
            // do we need more for attachments - call validateAttachments
            // do we need anything else??
            // if (err) {
            //     console.log(`Hmmm, what is happening here:\n${err}`);
            // } else {
            //     console.log('statement is fully validated\n', results);
            // }
            cb(err, results);
        });
    }
);  // end closure
