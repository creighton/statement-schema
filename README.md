# statement-schema

these are still valid concerns to be investigated and improved:
- not validating lang codes
- attachment contentType just does a pattern match

From the command line this lets you specify a file which contains an xapi statement.  

To download and install:
```
> git clone https://github.com/<username - likely creighton or cr8onski>/statement-schema.git
> cd statement-schema
> npm install
```

The following commands are valid from the command line:

```
> node validator.js
```
This command prompts the user on the command line for the filename for the xapi statement. Useful for testing that validator is installed and working correctly.

```
> node validator.js minimal
```
Specify any filename in the statements folder to use as the xapi statement to validate.  To add you own statement for testing add it to the statements folder and save as `.json`.

```
> node validator.js -a
```
This command will read all files in the statements folder and validate them all.

```
> node validator.js -f result
```
Specify a folder name in `./test/statements/` to validate all statements in the specified folder.

```
> node validator.js various -v
```
The `-v` option turns on verbose reporting as opposed to the pass/fail default reporting.

To use from another node.js program:
*Note*: the `require-demo.js` script has many of these examples.
- to load a statement as a json object:
```
const stmt = require('<path to statement file>/<filename>');
```
*Note*: the extension is not needed as part of the require command.  It will look for a `.json` extension and will load as a json object.

- to process a full statement:
```
const val = require('./src/processStmt.js');
val(stmt, (err, data) => {
    console.log(`Error: ${err}\nData: ${data}`);
    cb();
});
```

- to process an individual property:
```
const property-validator = require('./src/validate<Property>');
property-validator(stmt.<property>, (err, data) => {
    console.log(`Validating ${property}\nError: ${err}\nData ${data}`);
    cb();
});
```
*for example with actor:*
```
const actor = require('./src/validateActor');
actor(stmt.actor, (err, data) => {
    console.log(`Validating Actor:\nError: ${err}\nData ${data}`);
    cb();
});
```
*Note: context uses an additional property (object.objectType)*
```
const context = require('./src/validateContext');
context(stmt.context, stmt.object.objectType, (err, data) => {
    console.log(`Validating Context:\nError: ${err}\nData ${data}`);
    cb();
});
```
*Note*: the returned error property handles thrown errors in the code.  Messages about the schema validation are passed as part of the data property.

- to process all properties of a statement individually:
```
function (cb) {
    const minimal = require('./test/statements/minimal');
    for(const propname of Object.keys(minimal)) {
        chkProp(minimal[propname], propname, cb);
    }
    cb();
}
```
and
```
function chkProp (prop, propname, cb) {
    console.log(`begin check property - ${propname}`);
    try {
        temp = propname.substring(0, 1).toUpperCase() + propname.substring(1).toLowerCase();
        console.log(temp);
        const fn = (require(`./src/validate${temp}`));
        fn(prop, (err, data) => {
            console.log(`${propname} Only:\nError: ${err}\nData: ${data}`);
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
    console.log(`end check property - ${propname}`);
}
```
*Note:* Remember to account for context.

## Some other scripts for demonstration purposes:

### require-demo.js

### retrieve-and-validate.js

### SCORMProfileStmts.js

### validator.html
