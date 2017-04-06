# statement-schema

> IRI validation should be done via lib.. these don't really do much

- not checking raw is in range of min/max, if present
- iri not complete
- not validating lang codes
- group doesn't test member/ifi requirement
- group not done, yet
    - group as the object not working
    - group as the actor not working
- interaction activities aren't great
- attachment contentType just does a pattern match
- doesn't look for substatements in substatements


From the command line this lets you specify a file which contains an xapi statement.  The following commands are valid from the command line:

```
> node validator.js
```
This command runs with a default file for the xapi statement. Useful for testing that validator is installed and working correctly.

```
> node validator.js minimal.json
```
Specify any filename in the statements folder to use as the xapi statement to validate.  To add you own statement for testing add it to the statements folder and save as `.json`.

```
> node validator.js -a
```
This command will read all files in the statements folder and validate them all.
