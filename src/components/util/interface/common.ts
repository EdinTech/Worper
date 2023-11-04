
export type TemplateType = {
    "applier": string,
    "checker": string,
    "tableName": string,
    "action": string,
    "sql": string,
    "description": string,
    "extension": string
}
export interface Pages {
    [key: string]: { path: string, element: JSX.Element }
}

export type TemplateListType = {
    "key": string,
    "templateTitle": string,
    "description": string,
    "fileName": string,
    "createdAt": string,
    "updatedAt": string
}

export type IFTemplateList = {
    [key: string]: TemplateListType
}

export type PatchingSetting = {
    default_applicant: string,
    default_checker: string,
    members: string[],
    action: string[],
    action_auto_saving: "on"|"off",
    table_name: {
        [value: string]: string
    },
}
