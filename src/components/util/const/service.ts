import { ServiceInformation } from "../interface/main";
import { path } from "./path";

export const serviceInformations: ServiceInformation[] = [
    {
        id: 'sql-file-generator',
        title: 'Sql File Generator',
        description: 'Generate SQL files for patching by a template',
        path: path.patchingGenerate,
        parentCategory: 'Sql'
    },
    {
        id: 'sql-file-generator',
        title: 'Sql File Generator Templates',
        description: 'Register and edit a Template to Generate SQL files',
        path: path.patchingTemplate,
        parentCategory: 'Sql'
    }
];