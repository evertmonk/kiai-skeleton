### Kiai VoiceAction Skeleton
Boilerplate and example code for using the Kiai VoiceAction Framework.

## sync dialogflow agent
In order to use the syncing tools, there should be a key-file with credentials for the project you want to interact with in the `tools/sync/keys` folder. Note that you can have more than one file (for multiple projects).

After that, you can run the sync script like so:
```sh
npm run sync PROJECT-ID OPERATION [RESTORE-FILE]
```
The `PROJECT-ID` is used to look up the correct key-file, and `OPERATION` can be one of the following:
  
 * __down__: writes the remote project to local json files into `config/dialogflow-agent` (and runs validate command when done)
 * __up__: pushes local json files to remote
 * __compare__: shows differences between local & remote
 * __validate__: gives some reports on the local files
 * __export__: exports the project to a zip file
 * __restore__: restores the project from a zip file (3rd argument)

See [Kiai VoiceAction Framework](https://github.com/mediamonks/kiai).
