import { TourProps } from "antd";
import { TemplateListType, TemplateType } from "./common";

export interface ServiceInformation {
    id: number;
    title: string;
    description: string;
    path: string;
    parentCategory: string;
}

export type MainServiceRecentlyProps = {
    accessTime: string;
} & ServiceInformation;

export interface SettingPatchingSql {
    defaultPath: string;
    templatePath: string;
}

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
    "title_index": {
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
    payload: TemplateListType;
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
    onUpdate: () => void;
    onDelete: () => void;
    mode: "create" | "update";
    disabled: boolean;
}

export interface OutputFilesControlProps {
    onUpdate: () => void,
    onDelete: () => void,
    isChecked: boolean,
    isValidated: boolean,
    selectedFileLength: number
}

export interface SearchingSqlControlProps {
    onCreate: () => void,
    onUpdate: () => void,
    onDelete: () => void,
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
    disabled: boolean
}

export interface FileContentProps {
    fileState: FileStateType;
    setFileState: React.Dispatch<React.SetStateAction<FileStateType>>;
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SettingCardProps {
    title: string;
    steps: TourProps['steps'];
    children: React.ReactNode;
    tourOpen: boolean;
    setTourOpen: (open: boolean) => void;
}

export interface SearchingSqlModifyContentProps {
    originFileName: string;
    fileName: string;
    setFileName: React.Dispatch<React.SetStateAction<string>>;
    fileContent: string;
    setFileContent: React.Dispatch<React.SetStateAction<string>>;
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SearchingSqlModifyControlProps {
    onCreate: ()=> void;
    onUpdate: ()=> void;
    mode: string;
    disabled: boolean;
}
