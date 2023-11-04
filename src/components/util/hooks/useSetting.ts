import { PATCHING } from "../const/setting";
import useStore from "./useStore";

const useSetting = () => {

    const { store } = useStore();

    const createPatchingSetting = () => {

        // workspace path
        const getWorkspacePath = async () => {
            return await store.get(PATCHING.WORKSPACE_PATH_KEY, "string")
        }
        const setWorkspacePath = async (path: string) => {
            return await store.set(PATCHING.WORKSPACE_PATH_KEY, path, "string")
        }

        // default output path
        const getDefaultOutputDirectoryPath = async () => {
            return await store.get(PATCHING.DEFAULT_OUTPUT_DIRECTORY_PATH_KEY, "string")
        }
        const setDefaultOutputDirectoryPath = async (path: string) => {
            return await store.set(PATCHING.DEFAULT_OUTPUT_DIRECTORY_PATH_KEY, path, "string")
        }

        // output path
        const getOutputDirectoryPath = async () => {
            return await store.get(PATCHING.OUTPUT_DIRECTORY_PATH_KEY, "string")
        }
        const setOutputDirectoryPath = async (path: string) => {
            return await store.set(PATCHING.OUTPUT_DIRECTORY_PATH_KEY, path, "string")
        }
        const removeOutputDirectoryPath = async () => {
            return await store.delete(PATCHING.OUTPUT_DIRECTORY_PATH_KEY)
        }

        // current output path
        const getCurrentOutputDirectoryPath = async () => {
            let currentOutputPath = await getDefaultOutputDirectoryPath() as string;
            if (!currentOutputPath) {
                return;
            }

            const customOutputPath = await getOutputDirectoryPath();
            if (customOutputPath) {
                currentOutputPath = customOutputPath as string;
            }
            return currentOutputPath;
        }

        // setting directory path
        const getSettingDirectoryPath = async () => {
            return await store.get(PATCHING.SETTING_DIRECTORY_PATH_KEY, "string")
        }
        const setSettingDirectoryPath = async (path: string) => {
            return await store.set(PATCHING.SETTING_DIRECTORY_PATH_KEY, path, "string")
        }

        // setting file path
        const getSettingFilePath = async () => {
            return await store.get(PATCHING.SETTING_FILE_PATH_KEY, "string")
        }
        const setSettingFilePath = async (path: string) => {
            return await store.set(PATCHING.SETTING_FILE_PATH_KEY, path, "string")
        }

        // template directory path
        const getTemplateDirectoryPath = async () => {
            return await store.get(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY, "string")
        }
        const setTemplateDirectoryPath = async (path: string) => {
            return await store.set(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY, path, "string")
        }

        // template index file path
        const getTemplateIndexFilePath = async () => {
            return await store.get(PATCHING.TEMPLATE_INDEX_FILE_PATH_KEY, "string")
        }
        const setTemplateIndexFilePath = async (path: string) => {
            return await store.set(PATCHING.TEMPLATE_INDEX_FILE_PATH_KEY, path, "string")
        }

        // template list file path
        const getTemplateListFilePath = async () => {
            return await store.get(PATCHING.TEMPLATE_LIST_FILE_PATH_KEY, "string")
        }
        const setTemplateListFilePath = async (path: string) => {
            return await store.set(PATCHING.TEMPLATE_LIST_FILE_PATH_KEY, path, "string")
        }

        return {
            getWorkspacePath,
            setWorkspacePath,
            getDefaultOutputDirectoryPath,
            setDefaultOutputDirectoryPath,
            getOutputDirectoryPath,
            setOutputDirectoryPath,
            removeOutputDirectoryPath,
            getCurrentOutputDirectoryPath,
            getSettingDirectoryPath,
            setSettingDirectoryPath,
            getSettingFilePath,
            setSettingFilePath,
            getTemplateDirectoryPath,
            setTemplateDirectoryPath,
            getTemplateIndexFilePath,
            setTemplateIndexFilePath,
            getTemplateListFilePath,
            setTemplateListFilePath
        }
    }

    const patchingSetting = createPatchingSetting();
    return { patchingSetting }
}

export default useSetting;