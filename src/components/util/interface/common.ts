
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
    "template": string,
    "description": string,
    "file": string,
    "createdAt": string
}