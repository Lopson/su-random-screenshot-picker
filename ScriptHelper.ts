namespace ScriptHelper {
    const ScriptIdEmptyError: string = "Was given empty script ID";
    const NoParentError: string = "No Drive parent found for script";

    export function GetScriptId(): string {
        return ScriptApp.getScriptId();
    }

    export function GetScriptDriveParentId(scriptId: string): GoogleAppsScript.Drive.Folder {
        if (ProjectGlobals.IsStringEmpty(scriptId)) {throw ScriptIdEmptyError;}

        let scriptDriveFile: GoogleAppsScript.Drive.File = DriveHelper.GetDriveFileFromId(scriptId);
        let scriptParents: GoogleAppsScript.Drive.FolderIterator = scriptDriveFile.getParents();
        let result: GoogleAppsScript.Drive.Folder;

        if (scriptParents.hasNext()) {
            result = scriptParents.next();
        }
        else {
            throw NoParentError + ` ${scriptId}`;
        }

        return result;
    }
}
