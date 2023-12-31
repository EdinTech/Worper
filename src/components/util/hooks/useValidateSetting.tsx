import { useEffect, useState } from "react";
import AppAlert from "../../ui/AppAlert";
import { path } from "../const/path";
import { Link } from "react-router-dom";
import { NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE } from "../const/message";
import useSetting from "./useSetting";

const useValidateSetting = () => {

    const [appAlert, setAppAlert] = useState<React.ReactNode>(null);
    const [isValidated, setIsValidated] = useState(false);
    const { setting } = useSetting();

    useEffect(() => {
        const settingPath = path.setting;
        (async () => {
            const path = await setting.getWorkspacePath();
            path ? setIsValidated(true) : setAppAlert(<AppAlert
                messages={[[NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE.title, NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE.description]]}
                type="warning"
                closable={true}
                showIcon={true}
                action={<Link to={settingPath}>go setting</Link>}
            />);
        })();
    }, []);

    return { appAlert, isValidated }
}

export default useValidateSetting;