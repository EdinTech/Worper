import AppPageTitle from "../../ui/AppPageTitle";
import SettingPatchingSql from "./patching-sql";
import { AppAlert as alertType } from "../../util/interface/pages";
import { useEffect, useState } from "react";
import AppAlert from "../../ui/AppAlert";
import useElectronStore from "../../util/hooks/useElectronStore";
import { PATCHING } from "../../util/const/setting";
import { NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE } from "../../util/const/message";

const SettingPage = () => {

    const [alertMessages, setAlertMessages] = useState<[string, string][]>([]);
    const { electronStore } = useElectronStore();

    const alert: alertType = (title, message) => {
        setAlertMessages(messages => [...messages, [title, message]]);
    }

    useEffect(() => {
        (async () => {
            const settingDefaultValue = await electronStore.get(PATCHING.WORKSPACE_PATH_KEY);
            if (!settingDefaultValue) {
                alert(NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE.title,
                    NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE.description);
            }

        })();
    }, []);

    return (
        <>
            <AppPageTitle>Generate Setting</AppPageTitle>
            <AppAlert
                messages={alertMessages}
                type="warning"
                closable={true}
                showIcon={true}
            />
            <SettingPatchingSql />
        </>
    )
}

export default SettingPage;