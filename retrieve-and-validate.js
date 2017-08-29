/**
 * Retrieve a bunch of statements from the ADL LRS and validate.
 */

const request = require('request');
const valStmt = require('./src/processStmt');
const fs = require('fs');

let opts = {
    url: "https://lrs.adlnet.gov/xapi/statements",
    headers: {
        'X-Experience-API-Version': '1.0.3',
        'Authorization': 'Basic YW5keToxMjM0',
        'Content-Type': 'application/json'
    },
    // qs: {
    //     limit: 3
    // }
};

let url = 'https://lrs.adlnet.gov/xapi',
    user = 'andy',
    pass = '1234';
let green = '', msg = '', path = '';
// console.log(request);
request.get(opts, (res) => {
    console.log('Thank you! Have a nice day.');

})
// .auth(user, pass, false)
.on('error', (err) => {
    console.log('there has been a mistake', err);
}).on('response', (res) => {
    msg = `${res.statusCode}  ${res.statusMessage}`;
    path = `${res.req.path}`
}).on('data', (data) => {
    // console.log('green', typeof data, data);
    green += data.toString();

}).on('end', (err, res, body) => {
    const blue = JSON.parse(green);
    console.log(`\n${path}\n\nit is over ${msg}\nthere are ${blue.statements.length} statements, and there are ${blue.more? 'more':'no more'} available.`);
    for(stmt of blue.statements) {
        valStmt(stmt, `stmt[${stmt.id}]`, (err, result, filename) => {
            // result[0] += 'error'
            console.log(`${filename}\t${err?'errors in the request':(result.join().includes('error'))?'\n'+result.join('\n\t'):'Pass'}\n\n`);
            if (result.join().includes('error')) {
                fs.writeFile('./log/'+filename+'.log', result.join('\n\t') + '\n\n\n' + JSON.stringify(stmt, null, 4), (err) => {
                    if (err) throw err;
                    console.log('File '+filename+' saved');
                });
            }
        });
    }
});
