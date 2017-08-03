# statement-schema

> IRI validation should be done via lib.. these don't really do much

these are still valid concerns to be investigated and improved:
- iri not complete
- not validating lang codes
- interaction activities aren't great
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
