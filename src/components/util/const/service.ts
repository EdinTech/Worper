import { ServiceInformation } from "../interface/pages";
import { path } from "./path";

export const serviceInformations: ServiceInformation[] = [
    {
        id: 1,
        title: 'Sql File Generator',
        description: 'Generate SQL files for patching by a template',
        path: path.patchingGenerate,
        parentCategory: 'Sql'
    },
    {
        id: 2,
        title: 'Templates',
        description: 'A Template list to Generate SQL files',
        path: path.patchingTemplate,
        parentCategory: 'Sql'
    },
    {
        id: 3,
        title: 'Output Files',
        description: 'Output Files for Patching',
        path: path.patchingOutputFile,
        parentCategory: 'Sql'
    },
    {
        id: 4,
        title: 'Sql',
        description: 'A Sql file list to Search',
        path: path.searchingSql,
        parentCategory: 'Sql'
    }
];