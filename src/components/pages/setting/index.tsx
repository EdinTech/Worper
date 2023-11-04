import { useEffect, useState } from "react";
import useStore from "../../util/hooks/useStore";
import SettingPatchingSql from "./patching-sql";
import AppPageTitle from "../../ui/AppPageTitle";
import AppAlert from "../../ui/AppAlert";
import { NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE } from "../../util/const/message";
import { PATCHING } from "../../util/const/setting";
import SettingPatchingSqlDetail from "./patching-sql-detail";

const SettingPage = () => {

    const [alertMessages, setAlertMessages] = useState<[string, string][]>([]);
    const { store } = useStore();

    useEffect(() => {
        (async () => {
            // If exists workspace path, do nothing.
            if (await store.get(PATCHING.WORKSPACE_PATH_KEY, "string")) {
                return;
            }
            setAlertMessages(prevState => [
                ...prevState,
                [NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE.title, NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE.description]
            ])
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

            <SettingPatchingSqlDetail />
        </>
    )
}

export default SettingPage;