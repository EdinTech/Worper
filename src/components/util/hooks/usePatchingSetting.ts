import { useEffect, useState } from "react";
import useElectronStore from "./useElectronStore";
import useFileSystem from "./useFileSystem";
import { PATCHING } from "../const/setting";

type PatchingSetting = {
    default_applicant: string,
    default_checker: string,
    members: string[],
    action: string[],
    table_name: {
        [value: string]: string
    },
}

const usePatchingSetting = () => {
    const { electronStore } = useElectronStore();
    const { fs } = useFileSystem();

    const [value, setValue] = useState<PatchingSetting>();
    const [settingFilePath, setSettingFilePAth] = useState<string>();

    useEffect(() => {

        (async () => {
            const path = await electronStore.get(PATCHING.SETTING_FILE_PATH_KEY);
            if (!path) {
                return;
            }

            const settingString = await fs.readFile(path);
            setValue(JSON.parse(settingString));
            setSettingFilePAth(path);
        })();

    }, []);

    const useSetting = async () => {
        const path = await electronStore.get(PATCHING.SETTING_FILE_PATH_KEY);
        if (!path) {
            return;
        }
        const settingString = await fs.readFile(path);
        return JSON.parse(settingString);
    }

    const createModifier = () => {

        const modifyDefaultApplicant = (member: string) => {
            setValue(preState => {

                const previousState = { ...preState };
                previousState.default_applicant = member;
                fs.writeFile(settingFilePath, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const modifyDefaultChecker = (member: string) => {
            setValue(preState => {

                const previousState = { ...preState };
                previousState.default_checker = member;
                fs.writeFile(settingFilePath, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const addMember = (member: string) => {
            setValue(preState => {

                const previousState = { ...preState };
                previousState.members.push(member);
                fs.writeFile(settingFilePath, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const removeMember = (member: string) => {
            setValue(preState => {

                const previousState = { ...preState };
                previousState.members = previousState.members.filter(m => m !== member);
                fs.writeFile(settingFilePath, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const addAction = (action: string) => {
            setValue(preState => {

                const previousState = { ...preState };
                previousState.action.push(action);
                fs.writeFile(settingFilePath, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const removeAction = (action: string) => {
            setValue(preState => {

                const previousState = { ...preState };
                previousState.action = previousState.action.filter(a => a !== action);
                fs.writeFile(settingFilePath, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const addTableName = (tableName: string, value: string) => {
            setValue(preState => {

                const previousState = { ...preState };
                previousState.table_name[tableName] = value;
                fs.writeFile(settingFilePath, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const removeTableName = (tableName: string) => {
            setValue(preState => {

                const previousState = { ...preState };
                delete previousState.table_name[tableName];
                fs.writeFile(settingFilePath, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        return {
            modifyDefaultApplicant,
            modifyDefaultChecker,
            addMember,
            removeMember,
            addAction,
            removeAction,
            addTableName,
            removeTableName,
        }
    }

    const modifier = createModifier();

    return { setting: value, modifier, useSetting } as const;
}

export default usePatchingSetting;