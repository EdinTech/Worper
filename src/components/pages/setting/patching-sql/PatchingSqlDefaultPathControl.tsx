import { useEffect, useState } from "react";
import { Space, Button, Form, Input } from 'antd';
import { validateMessages } from "../../../util/const/validate";
import useFileSystem from "../../../util/hooks/useFileSystem";
import useMessage from "../../../util/hooks/useMessage";
import { PATCHING } from "../../../util/const/setting";
import useSetting from "../../../util/hooks/useSetting";

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const PatchingSqlDefaultPathControl: React.FC = () => {

    const [disable, setDisable] = useState(false);
    const [workspacePath, setWorkspacePath] = useState('');
    const { fs, isLoading } = useFileSystem();
    const { message, contextHolder } = useMessage();
    const { patchingSetting } = useSetting();

    useEffect(() => {
        (async () => {
            const value = await patchingSetting.getWorkspacePath();
            if (!value) {
                return;
            }
            setWorkspacePath(value);
            setDisable(true);
        })();
    }, []);

    const onInputWorkspace = (e: React.FormEvent<HTMLInputElement>) => {
        setWorkspacePath(e.currentTarget.value.trim());
    }

    const onClickButton = async () => {

        if (disable) {
            setDisable(false);
            return;
        }

        if (workspacePath.length === 0) {
            return;
        }

        // set workspace directory path
        if (!await fs.start(workspacePath)) {
            message.error("No find Directory.")
            return;
        }
        patchingSetting.setWorkspacePath(workspacePath);

        // set default output directory path
        const outputDirectoryPath = workspacePath + '/' + PATCHING.OUTPUT_DIRECTORY_NAME;
        await fs.createDirectoryIfNotExists(outputDirectoryPath);
        patchingSetting.setDefaultOutputDirectoryPath(outputDirectoryPath);

        // set setting directory path
        const settingDirectoryPath = workspacePath + '/' + PATCHING.SETTING_DIRECTORY_NAME;
        await fs.createDirectoryIfNotExists(settingDirectoryPath);
        patchingSetting.setSettingDirectoryPath(settingDirectoryPath);

        // set setting file
        // directory_path/setting/setting.json
        const settingFilePath = settingDirectoryPath + '/' + PATCHING.SETTING_FILE_NAME;
        await fs.createFileIfNotExists(settingFilePath, PATCHING.INITIAL_SETTING_FILE_CONTENT);
        patchingSetting.setSettingFilePath(settingFilePath);

        // set template directory path
        const templatesDirectoryPath = workspacePath + '/' + PATCHING.TEMPLATE_DIRECTORY_NAME;
        await fs.createDirectoryIfNotExists(templatesDirectoryPath);
        patchingSetting.setTemplateDirectoryPath(templatesDirectoryPath);

        // set example template file
        // directory_path/templates/ex1.json
        const exampleTemplateFilePath = templatesDirectoryPath + '/' + PATCHING.EXAMPLE_TEMPLATE_FILE_NAME;
        await fs.createFileIfNotExists(exampleTemplateFilePath, PATCHING.INITIAL_EXAMPLE_TEMPLATE_FILE_CONTENT);

        // set template index file
        // directory_path/templates/template_index.json
        const templateIndexFilePath = templatesDirectoryPath + '/' + PATCHING.TEMPLATE_INDEX_FILE_NAME;
        await fs.createFileIfNotExists(templateIndexFilePath, PATCHING.INITIAL_TEMPLATE_INDEX_FILE_CONTENT);
        patchingSetting.setTemplateIndexFilePath(templateIndexFilePath);

        // set template list file
        // directory_path/templates/template_list.json
        const templateListFilePath = templatesDirectoryPath + '/' + PATCHING.TEMPLATE_LIST_FILE_NAME;
        await fs.createFileIfNotExists(templateListFilePath, PATCHING.INITIAL_TEMPLATE_LIST_FILE_CONTENT);
        patchingSetting.setTemplateListFilePath(templateListFilePath);

        message.success("Directory saved.");
        setDisable(true);
    }

    return (
        <>
            {contextHolder}
            <Form
                {...layout}
                style={styles.form}
                validateMessages={validateMessages}
            >
                <Form.Item name={['path']} label="Workspace path" rules={[{ required: true }]}>
                    <Space direction="horizontal" style={styles.space}>
                        <Input
                            style={styles.input}
                            disabled={disable}
                            onInput={onInputWorkspace}
                            value={workspacePath}
                        />
                        {isLoading && <Button style={styles.button} loading></Button>}
                        {!isLoading && <Button style={styles.button} onClick={onClickButton}>{disable ? 'Edit' : 'Save'}</Button>}
                    </Space>
                </Form.Item>
            </Form>
        </>
    )
}

export default PatchingSqlDefaultPathControl;

const styles = {
    form: {
        maxWidth: 500
    },
    space: {
        width: '100%'
    },
    input: {
        minWidth: 400
    },
    button: {
        width: 80
    }
}