# Steven Universe Random Screenshot Picker
A Google Apps Script project meant to be deployed as a Web App. All this does is go into a given folder and return the embed URL of one of its random JPG/PNG files.

Developed this with the intent of facilitating the study of screenshots stored in a Google Drive folder.

## How It Works
This project has two main components: a function meant to periodically dump the embed URLs of all files in the target folder into a JSON file, and a simple web page that redirects the user to a random URL picked from the JSON file with the embed URLs.

### Embed URL Dumper
Found in the file `FileListDump.ts`, all this does is it iterates over the JPG/PNG files of a given folder, obtains their embed URLs, and then dumps them as a JSON array of strings. The dump JSON file will be automatically created in the same folder in which the Apps Script Project is located at.

### Random URL Picker
Found in the file `Code.ts` it downloads the JSON file with the embed URLs, picks one of them at random, generates an HTML file that'll automatically redirect the user to that image, and finally server that HTML file to the user.

## Development Environment
Just get [clasp](https://developers.google.com/apps-script/guides/clasp) and its requirements and you'll be good to go.
