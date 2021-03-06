const NoDumpFilesFoundError: string = "Couldn't find database of SU screenshots";
const RandomFileUrlEmptyError: string = "Got empty random file URL string";

var url: string = "";

function doGet(): GoogleAppsScript.HTML.HtmlOutput {
    url = getRandomFile(ProjectGlobals.SuFolderId);
    if (ProjectGlobals.IsStringEmpty(url)) { throw RandomFileUrlEmptyError; }

    return HtmlService.createTemplateFromFile(ProjectGlobals.HtmlTemplateFile).evaluate().
        setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function getRandomIntInclusive(min: number, max: number): number {
    let minNumber: number = Math.ceil(min);
    let maxNumber: number = Math.floor(max);
    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
}

function getRandomFile(folderId: string): string {
    if (ProjectGlobals.IsStringEmpty(folderId)) { throw DriveHelper.FolderIdEmptyError; }

    let scriptFolder: GoogleAppsScript.Drive.Folder = ProjectGlobals.GetScriptParentFolder();
    let dumpFiles: GoogleAppsScript.Drive.File[] = DriveHelper.GetDriveFilesFromQuery(scriptFolder.getId(),
        ScriptFilesQuery);
    if (!dumpFiles || dumpFiles.length <= 0) {throw NoDumpFilesFoundError;}
    let dumpFile: GoogleAppsScript.Drive.File = dumpFiles[0];
    let suFileLinks: string[] = JSON.parse(dumpFile.getBlob().getDataAsString());

    let randomNumber: number = getRandomIntInclusive(0, suFileLinks.length);
    return suFileLinks[randomNumber];
}
