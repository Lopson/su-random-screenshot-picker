namespace DriveHelper {
    export const FolderIdEmptyError: string = "No folder ID given";
    const QueryEmptyError: string = "No query string passed";

    export function GetDriveFileFromId(fileId: string): GoogleAppsScript.Drive.File {
        return DriveApp.getFileById(fileId);
    }

    export function GetDriveFilesFromQuery(folderId: string, query: string): GoogleAppsScript.Drive.File[] {
        if (ProjectGlobals.IsStringEmpty(folderId)) { throw FolderIdEmptyError; }
        if (ProjectGlobals.IsStringEmpty(query)) { throw QueryEmptyError; }

        let fileIterator: GoogleAppsScript.Drive.FileIterator = DriveApp.getFolderById(folderId).searchFiles(query);
        let result: GoogleAppsScript.Drive.File[] = [];
        while (fileIterator.hasNext()) {
            result.push(fileIterator.next());
        }

        return result;
    }

    export function GetDriveFilesFromApiQuery(query: string): GoogleAppsScript.Drive.Schema.File[] {
        if (ProjectGlobals.IsStringEmpty(query)) { throw QueryEmptyError; }
    
        let files: GoogleAppsScript.Drive.Schema.FileList = {};
        let pageToken: string = "";
        let result: GoogleAppsScript.Drive.Schema.File[] = [];
    
        do {
            files = Drive.Files!.list({
                q: query,
                maxResults: 1000,
                pageToken: pageToken
            });
    
            if (files && files.items && files.items.length > 0) {
                for (var i = 0; i < files.items.length; i++) {
                    if (files.items[i]) {
                        result.push(files.items[i]);
                    }
                }
            }
    
            if (files.nextPageToken === undefined) { pageToken = ""; }
            else { pageToken = files.nextPageToken; }
        } while (pageToken);
    
        return result;
    }
}
