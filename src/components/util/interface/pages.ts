export interface SettingPatchingSql {
    defaultPath: string;
    templatePath: string;
}

export type AppAlert = (title: string, message: string) => void;

export interface PatchingFile {
    id: number,
    applyingDate: string,
    applier: string,
    checkingDate: string,
    checker: string,
    tableName: string,
    action: string,
    sql: string,
    description: string,
    extension: 'sql'
}

export type PBIOnChangeState = ({ type, value }: { type: string, value: string | number }) => void;

export interface PatchingComponentProps {
    state: PatchingFile,
    setState: React.Dispatch<React.SetStateAction<PatchingFile>>
}

export interface PBControl {
    state: PatchingFile,
    onChangeState: PBIOnChangeState
}

export interface PatchingGenerateResultPage {
    status: "success" | "error"
    title: string;
    subTitle: React.ReactNode;
    returnPath: string;
    fileName?: string;
    filePath?: string;
    error?: unknown;
}

export type GetFileName = (patchingFile: PatchingFile, extension?: 'sql' | null) => string;

export interface PatchingFileInfoProps {
    outputPath: string,
    state: PatchingFile
}

export interface PGSuccessSubTitleProps {
    filePath: string,
    fileName: string
}
