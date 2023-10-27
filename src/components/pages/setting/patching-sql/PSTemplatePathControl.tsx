import { useEffect, useState } from "react";
import { Space, Button, Form, Input } from 'antd';
import { validateMessages } from "../../../util/const/validate";
import useElectronStore from "../../../util/hooks/useElectronStore";
import useFileSystem from "../../../util/hooks/useFileSystem";
import useMessage from "../../../util/hooks/useMessage";
import { PATCHING } from "../../../util/const/setting";


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const PSTemplatePathControl: React.FC = () => {
    const [disable, setDisable] = useState(false);
    const [path, setPath] = useState('');
    const { fs, isLoading } = useFileSystem();
    const { message, contextHolder } = useMessage();

    const { electronStore } = useElectronStore();

    useEffect(() => {

        (async () => {
            const settingTemplatePath = await electronStore.get(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY);
            if (settingTemplatePath) {
                setPath(settingTemplatePath);
                setDisable(true);
            }
        })();

    }, []);

    const onClickButton = async() => {

        if (disable) {
            setDisable(false);
            return;
        }

        if (path.trim().length === 0) {
            electronStore.delete(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY);
            setPath(path);
            message.success("Directory deleted.");
            return;
        }

        // set template path
        const existsDirectory = await fs.start(path);
        if (!existsDirectory) {
            message.error("No find Directory.")
            return;
        }
        electronStore.set(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY, path);

        setPath(path);
        setDisable(true);
        message.success("Directory saved.");
    }

    return (
        <>
            {contextHolder}
            <Form
                {...layout}
                style={{ maxWidth: 500 }}
                validateMessages={validateMessages}
            >
                <Form.Item label="Template path">
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

export default PSTemplatePathControl;