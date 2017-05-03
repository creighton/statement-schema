# statement-schema

> IRI validation should be done via lib.. these don't really do much

- not checking raw is in range of min/max, if present *4e24b1d87f2e39212355b3dbe9148c9b44c8eb9e*
- group doesn't test member/ifi requirement *06747ff6a89978cd72eac7a8be4b228f300510cb*
- group not done, yet *9bf04ce2d3575ed2695b93c5014c489d81dc1725*
    - group as the object not working
    - group as the actor not working
- doesn't look for substatements in substatements *f31f186befe39dd67bdfb3b0616d77458d857cad*
- iri not complete
- not validating lang codes
- interaction activities aren't great
- attachment contentType just does a pattern match
- authority and other group/agent 

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
