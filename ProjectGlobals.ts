namespace ProjectGlobals {
    export const HtmlTemplateFile: string = "Index";
    export const SuFolderId: string = "TODO";
    export const SuListDumpFilename: string = "su_files_url.json";

    export function IsStringEmpty(value: string): boolean {
        if (!(value && value.length > 0)) {
            return true;
        }
        return false;
    }

    export function GetScriptParentFolder(): GoogleAppsScript.Drive.Folder {
        return ScriptHelper.GetScriptDriveParentId(ScriptHelper.GetScriptId());
    }
}