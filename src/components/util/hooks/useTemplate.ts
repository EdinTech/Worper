import useFileSystem from "./useFileSystem";
import { TemplateListType, TemplateType, IFTemplateList } from "../interface/common";
import useSetting from "./useSetting";
import { RETURN } from "../const/result";

export type TemplateIndexType = {
    title_index: {
        [title: string]: string
    },
}

const useTemplate = () => {
    const { fs } = useFileSystem();
    const { setting } = useSetting();

    const createTemplateListManager = () => {

        const get = async () => {
            const path = await setting.getTemplateListFilePath();
            if (!path) {
                return;
            }
            const file = await fs.readFile(path);
            return JSON.parse(file) as IFTemplateList;
        }

        const getByKey =async (key: string) => {
            const path = await setting.getTemplateListFilePath();
            if (!path) {
                return;
            }
            const file = await fs.readFile(path);
            const list = JSON.parse(file) as IFTemplateList;
            return list[key];
        }

        const add = async (key: string, listObj: TemplateListType) => {
            const path = await setting.getTemplateListFilePath();
            if (!path) {
                return;
            }
            const templateList = await get() as IFTemplateList;
            templateList[key] = listObj;
            await fs.writeFile(path, JSON.stringify(templateList, null, 2));
            return key;
        }

        const update = async (key: string, listObj: TemplateListType) => {
            const path = await setting.getTemplateListFilePath();
            if (!path) {
                return;
            }
            const templateList = await get() as IFTemplateList;
            templateList[key] = listObj;
            await fs.writeFile(path, JSON.stringify(templateList, null, 2));
        }

        const remove = async (key: string) => {
            const path = await setting.getTemplateListFilePath();
            if (!path) {
                return;
            }
            const templateList = await get() as IFTemplateList;
            delete templateList[key];
            await fs.writeFile(path, JSON.stringify(templateList, null, 2));
        }

        return { get, getByKey, add, update, remove }
    }

    const createTemplateIndexManager = () => {
        const get = async () => {
            const path = await setting.getTemplateIndexFilePath();
            if (!path) {
                return;
            }
            const file = await fs.readFile(path);
            return JSON.parse(file) as TemplateIndexType;
        }

        const add = async (indexObj: { [fileName: string]: string }) => {
            const path = await setting.getTemplateIndexFilePath();
            if (!path) {
                return;
            }
            const templateIndex = await get() as TemplateIndexType;
            templateIndex.title_index = {
                ...templateIndex.title_index,
                ...indexObj
            }
            await fs.writeFile(path, JSON.stringify(templateIndex, null, 2));
        }

        const remove = async (title: string, type: "title_index") => {
            const path = await setting.getTemplateIndexFilePath();
            if (!path) {
                return;
            }
            const templateIndex = await get() as TemplateIndexType;
            delete templateIndex[type][title];
            await fs.writeFile(path, JSON.stringify(templateIndex, null, 2));
        }

        return { get, add, remove }
    }

    const createTemplateManager = () => {

        const get = async (key: string) => {
            const path = await setting.getTemplateDirectoryPath();
            if (!path) {
                return;
            }
            const templateList = await templateListManager.getByKey(key) as TemplateListType;
            const filePath = `${path}/${templateList.fileName}`;
            const exists = await fs.start(filePath);
            if (!exists) {
                return;
            }
            const file = await fs.readFile(filePath);
            return JSON.parse(file) as TemplateType;
        }

        const create = async (templateObj: TemplateType) => {
            const path = await setting.getTemplateDirectoryPath();
            if (!path) {
                return;
            }
            const fileName = `${templateObj.applier}_${templateObj.checker}_${templateObj.tableName}_${templateObj.action}.${templateObj.extension}`;
            await fs.writeFile(`${path}/${fileName}`, JSON.stringify(templateObj, null, 2));
            return {
                path,
                fileName,
            };
        }

        const update = async (key: string, templateObj: TemplateType) => {
            const path = await setting.getTemplateDirectoryPath();
            if (!path) {
                return;
            }
            const templateList = await templateListManager.getByKey(key) as TemplateListType;
            const filePath = `${path}/${templateList.fileName}`;
            return await fs.writeFile(filePath, JSON.stringify(templateObj, null, 2));
        }

        const remove = async (key: string) => {
            const path = await setting.getTemplateDirectoryPath();
            if (!path) {
                return;
            }
            const templateList = await templateListManager.getByKey(key) as TemplateListType;
            const filePath = `${path}/${templateList.fileName}`;
            return await fs.unlink(filePath);
        }

        const search = async (title: string) => {
            const output = {
                exists: false,
                template: null as TemplateType,
            }
            const index = await templateIndexManager.get();
            if (!index) {
                return RETURN.FAILURE(output, "Not Found Template(No Index)")
            }

            const key = index.title_index[title];
            if (!key) {
                return RETURN.FAILURE(output, "Not Found Template(No Index)")
            }

            const path = await setting.getTemplateDirectoryPath();
            if (!path) {
                return RETURN.FAILURE(output, "Not Found Template(No Path)")
            }

            const templateList = await templateListManager.get() as IFTemplateList;
            const fileName = templateList[key].fileName;
            const exists = await fs.start(`${path}/${fileName}`);
            if (!exists) {
                return RETURN.FAILURE(output, "Not Found Template(No File)")
            }

            output.template = await get(fileName);
            return RETURN.SUCCESS(output, "Found Template");
        }

        return { get, create, update, remove, search }
    }

    const templateListManager = createTemplateListManager();
    const templateIndexManager = createTemplateIndexManager();
    const templateManager = createTemplateManager();

    return { templateListManager, templateIndexManager, templateManager };
}

export default useTemplate;