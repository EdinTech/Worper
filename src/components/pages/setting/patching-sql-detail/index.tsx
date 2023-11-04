import { useEffect, useState } from "react";
import { Alert, Button, Form, Space, TourProps } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { validate } from "./settingValidator";
import SettingCard from "../ui/SettingCard";
import AppCode from "../../../ui/AppCode";
import { PatchingSetting } from "../../../util/interface/common";
import usePatchingSetting from "../../../util/hooks/usePatchingSetting";
import useMessage from "../../../util/hooks/useMessage";

const SettingPatchingSqlDetail: React.FC = () => {

    const [tourOpen, setTourOpen] = useState<boolean>(false);
    const [setting, setSetting] = useState<string>();
    const [errors, setErrors] = useState<Array<string>>();
    const { getSetting, modifier, isLoading } = usePatchingSetting();
    const { message, contextHolder } = useMessage();
    const [settingDisable, setSettingDisable] = useState<boolean>(true);

    useEffect(() => {
        getSetting().then(setting => {
            setSetting(JSON.stringify(setting, null, 4));
            setErrors(null);
        });

    }, []);

    useEffect(() => {
        validateSettingValue(setting, setErrors);
    }, [setting])

    const onChangeSetting = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setSetting(value);
    }

    const onSaveSetting = () => {
        if (settingDisable) {
            setSettingDisable(false);
            return;
        }

        if (!setting || errors) {
            return;
        }
        modifier.setAll(JSON.parse(setting));
        message.success("Successfully saved.");
        setSettingDisable(true);
    }

    return (
        <>
            {contextHolder}
            <SettingCard title="Sql Generator detail" steps={steps} tourOpen={tourOpen} setTourOpen={setTourOpen} >
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Form
                        layout={"vertical"}
                        initialValues={{ layout: "vertical" }}
                        style={{ width: "100%" }}
                    >
                        <Form.Item validateStatus={errors ? "error" : null} >
                            <TextArea
                                rows={20}
                                value={setting}
                                disabled={settingDisable}
                                placeholder="Sql"
                                onChange={onChangeSetting}
                            />
                        </Form.Item>
                        {errors && <Alert
                            message="Input Error"
                            description={<>{errors?.map(error => <div key={error}>{error}</div>)}</>}
                            type="error"
                            showIcon
                        />}
                    </Form>
                    <div style={{ textAlign: "right" }}>
                        <Button style={{width: 80}} onClick={onSaveSetting} loading={isLoading} disabled={errors && errors.length !== 0}>
                            {settingDisable ? 'Edit' : 'Save'}
                        </Button>
                    </div>
                </Space>
            </SettingCard>
        </>
    );
}

export default SettingPatchingSqlDetail;

const steps: TourProps['steps'] = [
    {
        title: 'default_applicant',
        description: <>
            <Space direction="vertical" style={{ width: "100%"}}>
                The default applicant settings on patching sql generator.
                <AppCode language="javascript">
                    "default_applicant": "string"
                </AppCode>
            </Space>
        </>,
    },
    {
        title: 'default_checker',
        description: <>
            <Space direction="vertical" style={{ width: "100%"}}>
                The default checker settings on patching sql generator.
                <AppCode language="javascript">
                    "default_checker": "string"
                </AppCode>
            </Space>
        </>,
    },
    {
        title: 'members',
        description: <>
            <Space direction="vertical" style={{ width: "100%"}}>
                The member settings displayed for approvers and applicants on patching sql generator.
                <AppCode language="javascript">
                    "members": [..."string"]
                </AppCode>
            </Space>
        </>,
    },
    {
        title: 'action',
        description: <>
            <Space direction="vertical" style={{ width: "100%"}}>
                The auto complete actions displayed.
                <AppCode language="javascript">
                    "action": [..."string"]
                </AppCode>
            </Space>
        </>,
    },
    {
        title: 'action_auto_saving',
        description: <>
            <Space direction="vertical" style={{ width: "100%"}}>
                The auto complete actions displayed.
                <AppCode language="javascript">
                    "action_auto_saving": "on" | "off"
                </AppCode>
            </Space>
        </>,
    },
    {
        title: 'table_name',
        description: <>
            <Space direction="vertical" style={{ width: "100%"}}>
                The auto complete table name displayed on patching sql generator.
                <AppCode language="javascript">
                    "table_name": &#123;
                    "search keyword": "value"
                    &#125;
                </AppCode>
            </Space>
        </>,
    },
];

let timeout: ReturnType<typeof setTimeout> | null;

const validateSettingValue = (settingValue: string, setErrors: React.Dispatch<React.SetStateAction<Array<string>>>) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    timeout = setTimeout(() => {
        try {
            const value = JSON.parse(settingValue) as PatchingSetting;
            const result = validate(value);
            if (!result.isValid) {
                setErrors(result.messages);
                return;
            }
            setErrors(null);
        } catch (e) {
            setErrors(["Invalid setting. setting is required json format."]);
        }
    }, 300);
}