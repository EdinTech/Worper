import { useEffect, useState } from "react";
import useElectronStore from "./useElectronStore";
import useFileSystem from "./useFileSystem";
import { PATCHING } from "../const/setting";
import { TemplateListType, TemplateType } from "../interface/common";

export type TemplateIndexType = {
    template_title_index: {
        [title: string]: string
    },
}

const useTemplate = () => {
    const { fs } = useFileSystem();
    const { electronStore } = useElectronStore();
    // const [templateDirectoryPath, setTemplateDirectoryPath] = useState<string>();
    const [templateIndexFilePath, setTemplateIndexFilePath] = useState<string>();
    const [templateListFilePath, setTemplateListFilePath] = useState<string>();

    useEffect(() => {
        (async () => {
            // setTemplateDirectoryPath(await electronStore.get(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY));
            setTemplateIndexFilePath(await electronStore.get(PATCHING.TEMPLATE_INDEX_FILE_PATH_KEY));
            setTemplateListFilePath(await electronStore.get(PATCHING.TEMPLATE_LIST_FILE_PATH_KEY));
        })();
    }, []);

    const createTemplateListManager = () => {

        const get = async () => {
            const path = await electronStore.get(PATCHING.TEMPLATE_LIST_FILE_PATH_KEY);
            if (!path) {
                return;
            }
            const file = await fs.readFile(path);
            return JSON.parse(file) as TemplateListType[];
        }

        const add = async (listObj: TemplateListType) => {
            const templateList = await get();
            templateList.push(listObj);
            await fs.writeFile(templateListFilePath, JSON.stringify(templateList, null, 2));
        }

        const update = async (listObj: TemplateListType) => {
            const templateList = await get();
            const index = templateList.findIndex(item => item.key === listObj.key);
            templateList[index] = listObj;
            await fs.writeFile(templateListFilePath, JSON.stringify(templateList, null, 2));
        }

        const remove = async (key: string) => {
            const templateList = await get();
            const index = templateList.findIndex(item => item.key === key);
            templateList.splice(index, 1);
            await fs.writeFile(templateListFilePath, JSON.stringify(templateList, null, 2));
        }

        return { get, add, update, remove }
    }

    const createTemplateIndexManager = () => {
        const get = async () => {
            const path = await electronStore.get(PATCHING.TEMPLATE_INDEX_FILE_PATH_KEY);
            if (!path) {
                return;
            }
            const file = await fs.readFile(path);
            return JSON.parse(file) as TemplateIndexType;
        }

        const add = async (indexObj: { [fileName: string]: string }) => {
            const templateIndex = await get() as TemplateIndexType;
            templateIndex.template_title_index = {
                ...templateIndex.template_title_index,
                ...indexObj
            }
            await fs.writeFile(templateIndexFilePath, JSON.stringify(templateIndex, null, 2));
        }

        const remove = async (title: string) => {
            const templateIndex = await get() as TemplateIndexType;
            delete templateIndex.template_title_index[title];
            await fs.writeFile(templateIndexFilePath, JSON.stringify(templateIndex, null, 2));
        }

        return { get, add, remove }
    }

    const createTemplateManager = () => {

        const get = async (fileName: string) => {
            const path = await electronStore.get(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY);
            if (!path) {
                return;
            }
            const file = await fs.readFile(`${path}/${fileName}`);
            return JSON.parse(file) as TemplateType;
        }

        const create = async (templateObj: TemplateType) => {
            const path = await electronStore.get(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY);
            const fileName = `${templateObj.applier}_${templateObj.checker}_${templateObj.tableName}_${templateObj.action}.${templateObj.extension}`;
            await fs.writeFile(`${path}/${fileName}`, JSON.stringify(templateObj, null, 2));
            return {
                exists: true,
                path: path,
                fileName,
            }; // return template file path.
        }

        const update = async (fileName: string, templateObj: TemplateType) => {
            const path = await electronStore.get(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY);
            return await fs.writeFile(`${path}/${fileName}`, JSON.stringify(templateObj, null, 2));
        }

        const remove = async (fileName: string) => {
            const path = await electronStore.get(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY);
            return await fs.unlink(`${path}/${fileName}`);
        }

        const search = async (title: string) => {
            const templateIndex = await templateIndexManager.get();
            const fileName = templateIndex.template_title_index[title];
            if (!fileName) {
                return {
                    exists: false,
                    message: "Not Found Template(No Index)",
                    data: null,
                }
            }

            const path = await electronStore.get(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY);
            const exists = await fs.start(`${path}/${fileName}`);
            if (!exists) {
                return {
                    exists: false,
                    message: "Not Found Template(No File)",
                    data: null,
                }
            }

            return {
                exists: true,
                message: "Found Template",
                data: await get(fileName),
            }
        }

        return { get, create, update, remove, search }
    }

    const createSettingManager = () => {
        return {
            getWorkspacePath:async () => {
                return await electronStore.get(PATCHING.WORKSPACE_PATH_KEY);
            },
            getTemplateDirectoryPath: async () => {
                return await electronStore.get(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY);
            },
            setTemplateDirectoryPath: async (path: string) => {
                await electronStore.set(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY, path);
            },
            getTemplateIndexFilePath: async () => {
                return await electronStore.get(PATCHING.TEMPLATE_INDEX_FILE_PATH_KEY);
            },
            setTemplateIndexFilePath: async (path: string) => {
                await electronStore.set(PATCHING.TEMPLATE_INDEX_FILE_PATH_KEY, path);
            },
            getTemplateListFilePath: async () => {
                return await electronStore.get(PATCHING.TEMPLATE_LIST_FILE_PATH_KEY);
            },
            setTemplateListFilePath: async (path: string) => {
                await electronStore.set(PATCHING.TEMPLATE_LIST_FILE_PATH_KEY, path);
            },
        }
    }

    const templateListManager = createTemplateListManager();
    const templateIndexManager = createTemplateIndexManager();
    const templateManager = createTemplateManager();
    const templateSettingManager = createSettingManager();

    return { templateListManager, templateIndexManager, templateManager, templateSettingManager };
}

export default useTemplate;