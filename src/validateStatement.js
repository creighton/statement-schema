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
module.exports = function (stmt, cb) {
    console.log('validating statement');
    const fs = require('fs');
    const V = require('ajv');
    const v = new V({"format":"full"});
// console.log('looky here', v.options);
let str = __dirname;
str = str.replace('src', 'test/schemas/statement.json');
// console.log(`This is what i'm talking about ${__dirname}\nand better yet\t\t\t ${str}`);
//     fs.readFile(str, 'utf8', (err, schemaStr) => {
//     // fs.readFile('./test/schemas/statement.json', 'utf8', (err, schemaStr) => {
//         if (err) throw err;
//         let schema = JSON.parse(schemaStr);
//         console.log(schema, '\n', require(str));
        let valid = v.validate(require(str), stmt);
        // console.log(valid);
        if (!valid) {
            // console.log(v.err);
            // console.log(`This is the ajv instance:\n${Object.keys(v)}\n${JSON.stringify(v.errors)}\n${v.errorsText()}`);
            cb(null, 'statement - ' + v.errorsText());
        } else {
            // console.log(`You win!! The statement begins valid:\n${valid}\n all done`);
            // console.log(`This is the ajv instance:\n${Object.keys(v)}\n${JSON.stringify(v.errors)}\n${v.errorsText}`);
            cb(null, 'statement - general structure validated');
        }
    // });

}
);  // end closure
