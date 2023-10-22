import { useEffect, useState } from "react";
import { Space, Button, Form, Input } from 'antd';
import { validateMessages } from "../../../util/const/validate";
import useFileSystem from "../../../util/hooks/useFileSystem";
import useMessage from "../../../util/hooks/useMessage";
import useElectronStore from "../../../util/hooks/useElectronStore";
import { PATCHING } from "../../../util/const/setting";

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const PSDefaultPAthControl: React.FC = () => {

    const [disable, setDisable] = useState(false);
    const [path, setPath] = useState('');
    const { fs, isLoading } = useFileSystem();
    const { message, contextHolder } = useMessage();

    const { electronStore } = useElectronStore();

    useEffect(() => {
        (async () => {
            const settingDefaultValue = await electronStore.get(PATCHING.DEFAULT_PATH_KEY);
            if (settingDefaultValue) {
                setPath(settingDefaultValue);
                setDisable(true);
            }
        })();
    }, []);

    const onClickButton = async () => {

        if (disable) {
            setDisable(false);
            return;
        }

        if (path.trim().length === 0) {
            return;
        }

        const existsDirectory = await fs.start(path);
        if (!existsDirectory) {
            message.error("No find Directory.")
            return;
        }

        // set default template path
        const templatesPath = path + '/' + PATCHING.DEFAULT_TEMPLATE_DIRECTORY_NAME;
        const existsTemplatesPath = await fs.start(templatesPath);
        if (!existsTemplatesPath) {
            await fs.mkdir(templatesPath);
        }
        electronStore.set(PATCHING.DEFAULT_TEMPLATE_PATH_KEY, templatesPath);

        // set default output path
        const outputPath = path + '/' + PATCHING.DEFAULT_OUTPUT_DIRECTORY_NAME;
        const existsOutputPath = await fs.start(outputPath);
        if (!existsOutputPath) {
            await fs.mkdir(outputPath);
        }
        electronStore.set(PATCHING.DEFAULT_OUTPUT_PATH_KEY, outputPath);

        // set default setting path
        const settingPath = path + '/' + PATCHING.DEFAULT_SETTING_DIRECTORY_NAME;
        const existsSettingPath = await fs.start(settingPath);
        if (!existsSettingPath) {
            await fs.mkdir(settingPath);
        }
        electronStore.set(PATCHING.DEFAULT_SETTING_PATH_KEY, settingPath);

        // set default path
        electronStore.set(PATCHING.DEFAULT_PATH_KEY, path);

        message.success("Directory saved.");
        setDisable((prevState) => !prevState);
    }

    return (
        <>
            {contextHolder}
            <Form
                {...layout}
                style={{ maxWidth: 500 }}
                validateMessages={validateMessages}
            >
                <Form.Item name={['path']} label="Default path" rules={[{ required: true }]}>
                    <Space direction="horizontal" style={{ width: '100%' }}>
                        <Input
                            style={{ minWidth: 400 }}
                            disabled={disable}
                            onInput={(e) => setPath(e.currentTarget.value)}
                            value={path}
                        />
                        {isLoading && <Button style={{ width: 80 }} loading></Button>}
                        {!isLoading && <Button style={{ width: 80 }} onClick={onClickButton}>{disable ? 'Edit' : 'Save'}</Button>}
                    </Space>
                </Form.Item>
            </Form>
        </>
    )
}

export default PSDefaultPAthControl;