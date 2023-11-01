import { TemplateListType, TemplateType } from "./common";

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

export interface PatchingTemplateProps {
    setState: React.Dispatch<React.SetStateAction<PatchingFile | TemplateType>>
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

export interface GenerateResultSuccessSubTitleProps {
    filePath: string,
    fileName: string
}

export interface TemplateIndex {
    "template_title_index": {
        [title: string]: string
    }
}

export interface TemplateListColumnType {
    key: React.Key;
    template: string;
    description: string;
    createdAt: string;
}

export interface TemplateControlProps {
    isChecked: boolean;
    isValidated: boolean;
    onCreate: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export interface PatchingTemplateModifyPageProps {
    templateListItem: TemplateListType;
    type: "modify" | "create";
}

export interface GenerateTemplateModifyFormProps {
    template: TemplateType;
}

export interface GenerateTemplateModifyControlProps {
    onCreate: () => void;
    onEdit: () => void;
}

export interface TemplateModifyFileInformation {
    templateListItem: TemplateListType;
    setTemplateListItem: React.Dispatch<React.SetStateAction<TemplateListType>>;
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TemplateModifyFormProps {
    template: TemplateType;
    setTemplate: React.Dispatch<React.SetStateAction<TemplateType>>;
}

export type TemplateModifyControlOnChangeState = ({ type, value }: { type: string, value: string | number }) => void;

export interface TemplateModifyControl {
    template: TemplateType,
    onChangeState: TemplateModifyControlOnChangeState
}

export interface interfaceUseServiceAccessHistoryProps {
    log: boolean;
}


export interface TemplateModifyControlProps {
    onCreate: () => void;
    onDelete: () => void;
    onUpdate: () => void;
    type: "create" | "modify";
    disabled: boolean;
}

export interface OutputFilesTemplateControlProps {
    onDelete: () => void,
    onEdit: () => void,
    isChecked: boolean,
    isValidated: boolean,
    selectedFileLength: number
}

export type FileStateType = {
    atime: string;
    mtime: string;
    ctime: string;
    birthtime: string;
    size: string;
    path: string;
    name: string;
    content: string;
    originName: string;
    isChanged: boolean;
}

export interface FileInformationProps {
    fileState: FileStateType;
}


export interface FileEditControlProps {
    onUpdate: () => Promise<void>
    onCancel: () => void
    disabled: boolean
}

export interface FileContentProps {
    fileState: FileStateType;
    setFileState: React.Dispatch<React.SetStateAction<FileStateType>>;
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
}