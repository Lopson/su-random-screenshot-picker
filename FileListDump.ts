const ScriptFilesQuery: string = `title = "${ProjectGlobals.SuListDumpFilename}" and trashed = false and
mimeType = "application/json"`;
const SuFilesQuery: string = `"${ProjectGlobals.SuFolderId}" in parents and trashed = false and
(mimeType = "image/jpeg" or mimeType = "image/png")`;

function DumpFileUrlsToCsv(): void {
    let scriptFolder: GoogleAppsScript.Drive.Folder = ProjectGlobals.GetScriptParentFolder();
    let dumpFiles: GoogleAppsScript.Drive.File[] = DriveHelper.GetDriveFilesFromQuery(scriptFolder.getId(),
        ScriptFilesQuery);
    for (let dumpFile of dumpFiles) {
        scriptFolder.removeFile(dumpFile);
    }
    
    let suFileEntries: GoogleAppsScript.Drive.Schema.File[] = DriveHelper.GetDriveFilesFromApiQuery(SuFilesQuery);
    let suFileUrls: string[] = [];

    for (let suStill of suFileEntries) {
        let embedLink: string = "";
        if (suStill.embedLink !== undefined && suStill.embedLink) {
            embedLink = suStill.embedLink;
        }

        if (!ProjectGlobals.IsStringEmpty(embedLink)) {
            suFileUrls.push(embedLink);
        }
    }

    if (suFileUrls.length <= 0) {return;}

    scriptFolder.createFile(ProjectGlobals.SuListDumpFilename,
        JSON.stringify(suFileUrls), "application/json");
}
