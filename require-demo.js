/**
 * This script runs by requiring and using scripts and statements from the statement-schema project.
 */

const async = require('async');
const stmt = require('./test/statements/gots-it-all.json');

function checkProperty (prop, propname, cb) {
    console.log(`begin check property - ${propname}`);
    let fn;
    switch (propname) {
        case 'id':
            fn = require('./src/validateId');
            break;
        case 'actor':
            fn = require('./src/validateActor');
            break;
        case 'verb':
            fn = require('./src/validateVerb');
            break;
        case 'object':
            fn = require('./src/validateObject');
            break;
        case 'result':
            fn = require('./src/validateResult');
            break;
        case 'context':
            fn = require('./src/validateContext');
            break;
        case 'timestamp':
            fn = require('./src/validateTimestamp');
            break;
        case 'stored':
            fn = require('./src/validateStored');
            break;
        case 'authority':
            fn = require('./src/validateAuthority');
            break;
        case 'version':
            fn = require('./src/validateVersion');
            break;
        case 'attachments':
            fn = require('./src/validateAttachments');
            break;
        case 'statement':
            fn = require('./src/validateStatement');
            break;
        default:
            console.log(`This property does not belong in an xAPI statment, nor is it a statement.  Validation is over.`);
            // cb();
    }
    if (fn) {
        fn(prop, (err, data) => {
            console.log(`${propname} Only:\nError: ${err}\nData: ${data}`);
        });
    }
    console.log(`end check property - ${propname}`);
    // cb();
}

async.series([
    // function (cb) {
    //     const val = require('./src/processStmt.js');
    //     val(stmt, (err, data) => {
    //         console.log(`Error: ${err}\nData: ${data}`);
    //         cb();
    //     });
    // },
    // function (cb) {
    //     const act = require('./src/validateActor');
    //     act(stmt.actor, (err, data) => {
    //         console.log(`\nActor Only:\nError: ${err}\nData: ${data}`);
    //         cb();
    //     });
    // },
    // function (cb) {
    //     const verb = require('./src/validateVerb');
    //     verb(stmt.verb, (err, data) => {
    //         console.log(`\nVerb Only:\nError: ${err}\nData: ${data}`);
    //         cb();
    //     });
    // },
    // function (cb) {
    //     const obj = require('./src/validateObject');
    //     obj(stmt.object, (err, data) => {
    //         console.log(`\nObject Only:\nError: ${err}\nData: ${data}`);
    //         cb();
    //     });
    // },
    // function (cb) {
    //     const result = require('./src/validateResult');
    //     result(stmt.result, (err, data) => {
    //         console.log(`\nResult Only:\nError: ${err}\nData: ${data}`);
    //         cb();
    //     });
    // },
    // function (cb) {
    //     const con = require('./src/validateContext');
    //     con(stmt.context, (err, data) => {
    //         console.log(`\nContext Only:\nError: ${err}\nData: ${data}`);
    //         cb();
    //     });
    // },
    // function (cb) {
    //     const time = require('./src/validateTimestamp');
    //     time(stmt.timestamp, (err, data) => {
    //         console.log(`\nTimestamp Only:\nError: ${err}\nData: ${data}`);
    //         cb();
    //     });
    // },
    // function (cb) {
    //     const stor = require('./src/validateStored');
    //     stor(stmt.stored, (err, data) => {
    //         console.log(`Stored Only:\nError: ${err}\nData: ${data}`);
    //         cb();
    //     });
    // },
    // function (cb) {
    //     const auth = require('./src/validateAuthority');
    //     auth(stmt.authority, (err, data) => {
    //         console.log(`Authority Only:\nError: ${err}\nData: ${data}`);
    //         cb();
    //     });
    // },
    // function (cb) {
    //     const version = require('./src/validateVersion');
    //     version(stmt.version, (err, data) => {
    //         console.log(`Version Only:\nError: ${err}\nData: ${data}`);
    //         cb();
    //     });
    // },
    // function (cb) {
    //     const attch = require('./src/validateAttachments');
    //     attch(stmt.attachments, (err, data) => {
    //         console.log(`Attachments Only:\nError: ${err}\nData: ${data}`);
    //         cb();
    //     })
    // },
    // function (cb) {
    //     const statement = require('./src/validateStatement');
    //     statement(stmt, (err, data) => {
    //         console.log(`Statement Only:\nError: ${err}\nData: ${data}`);
    //         cb();
    //     });
    // },
    function (cb) {
        const minimal = require('./test/statements/gots-it-all');
        for(const propname of Object.keys(minimal)) {
            checkProperty(minimal[propname], propname, cb);
        }
        cb();
    }
], function (err, res) {
    console.log(`\n\n\tI hope you've enjoyed this demonstration.`);
});
