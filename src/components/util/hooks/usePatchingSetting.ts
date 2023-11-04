import { useEffect, useState } from "react";
import useFileSystem from "./useFileSystem";
import useSetting from "./useSetting";
import { PatchingSetting } from "../interface/common";

const usePatchingSetting = () => {

    const { fs, isLoading } = useFileSystem();
    const [setting, setSetting] = useState<PatchingSetting>();
    const [settingPath, setSettingPath] = useState<string>();

    const { patchingSetting } = useSetting();

    useEffect(() => {

        (async () => {
            const path = await patchingSetting.getSettingFilePath();
            if (!path) {
                return;
            }
            const settingString = await fs.readFile(path);
            setSetting(JSON.parse(settingString));
            setSettingPath(path);
        })();

    }, []);

    const getSetting = async () => {
        const path = await patchingSetting.getSettingFilePath();
        if (!path) {
            return;
        }
        const settingString = await fs.readFile(path);
        return JSON.parse(settingString);
    }

    const getSettingPath = async () => {
        let path = settingPath;
        if (!path) {
            path = await patchingSetting.getSettingFilePath();
        }
        if (!path) {
            return;
        }
        return path;
    }

    const createModifier = () => {

        const setAll = async (setting: PatchingSetting) => {

            const path = await getSettingPath();
            if (!path) {
                return;
            }
            setSetting(setting);
            await fs.writeFile(path, JSON.stringify(setting, null, 2));
        }

        const modifyDefaultApplicant = async (member: string) => {

            const path = await getSettingPath();
            if (!path) {
                return;
            }

            setSetting(preState => {

                const previousState = { ...preState };
                previousState.default_applicant = member;
                fs.writeFile(path, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const modifyDefaultChecker = async (member: string) => {

            const path = await getSettingPath();
            if (!path) {
                return;
            }

            setSetting(preState => {

                const previousState = { ...preState };
                previousState.default_checker = member;
                fs.writeFile(path, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const addMember = async (member: string) => {

            const path = await getSettingPath();
            if (!path) {
                return;
            }

            setSetting(preState => {

                const previousState = { ...preState };
                previousState.members.push(member);
                fs.writeFile(path, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const removeMember = async (member: string) => {

            const path = await getSettingPath();
            if (!path) {
                return;
            }

            setSetting(preState => {

                const previousState = { ...preState };
                previousState.members = previousState.members.filter(m => m !== member);
                fs.writeFile(path, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const addAction = async (action: string) => {

            const path = await getSettingPath();
            if (!path) {
                return;
            }

            setSetting(preState => {

                const previousState = { ...preState };
                previousState.action.push(action);
                fs.writeFile(path, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const removeAction = async (action: string) => {

            const path = await getSettingPath();
            if (!path) {
                return;
            }

            setSetting(preState => {

                const previousState = { ...preState };
                previousState.action = previousState.action.filter(a => a !== action);
                fs.writeFile(path, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const addTableName = async (tableName: string, value: string) => {

            const path = await getSettingPath();
            if (!path) {
                return;
            }

            setSetting(preState => {

                const previousState = { ...preState };
                previousState.table_name[tableName] = value;
                fs.writeFile(path, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        const removeTableName = async (tableName: string) => {

            const path = await getSettingPath();
            if (!path) {
                return;
            }

            setSetting(preState => {

                const previousState = { ...preState };
                delete previousState.table_name[tableName];
                fs.writeFile(path, JSON.stringify(previousState, null, 2));

                return { ...previousState }
            });
        }

        return {
            setAll,
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

    return { setting, modifier, getSetting, isLoading } as const;
}

export default usePatchingSetting;