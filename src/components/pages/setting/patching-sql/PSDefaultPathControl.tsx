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
            const settingDefaultValue = await electronStore.get(PATCHING.WORKSPACE_PATH_KEY);
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

        if (path.length === 0) {
            return;
        }

        // workspace directory path
        const workspace = path;

        // set workspace directory path
        const existsDirectory = await fs.start(workspace);
        if (!existsDirectory) {
            message.error("No find Directory.")
            return;
        }
        electronStore.set(PATCHING.WORKSPACE_PATH_KEY, workspace);

        // set default output directory path
        const outputPath = workspace + '/' + PATCHING.OUTPUT_DIRECTORY_NAME;
        const existsOutputPath = await fs.start(outputPath);
        if (!existsOutputPath) {
            await fs.mkdir(outputPath);
        }
        electronStore.set(PATCHING.DEFAULT_OUTPUT_DIRECTORY_PATH_KEY, outputPath);

        // set setting directory path
        const settingPath = workspace + '/' + PATCHING.SETTING_DIRECTORY_NAME;
        const existsSettingPath = await fs.start(settingPath);
        if (!existsSettingPath) {
            await fs.mkdir(settingPath);
        }
        electronStore.set(PATCHING.SETTING_DIRECTORY_PATH_KEY, settingPath);

        // set setting file
        // directory_path/setting/setting.json
        const initialSettingFile = settingPath + '/' + PATCHING.SETTING_FILE_NAME;
        const existsInitialSettingFile = await fs.start(initialSettingFile);
        if (!existsInitialSettingFile) {
            await fs.writeFile(initialSettingFile, JSON.stringify(PATCHING.INITIAL_SETTING_FILE_CONTENT, null, 2));
        }
        electronStore.set(PATCHING.SETTING_FILE_PATH_KEY, initialSettingFile);

        // set template directory path
        const templatesPath = workspace + '/' + PATCHING.TEMPLATE_DIRECTORY_NAME;
        const existsTemplatesPath = await fs.start(templatesPath);
        if (!existsTemplatesPath) {
            await fs.mkdir(templatesPath);
        }
        electronStore.set(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY, templatesPath);

        // set example template file
        // directory_path/templates/ex1.json
        const exampleTemplateFilePath = templatesPath + '/' + PATCHING.EXAMPLE_TEMPLATE_FILE_NAME;
        const existsExampleTemplateFile = await fs.start(exampleTemplateFilePath);
        if (!existsExampleTemplateFile) {
            await fs.writeFile(exampleTemplateFilePath, JSON.stringify(PATCHING.INITIAL_EXAMPLE_TEMPLATE_FILE_CONTENT, null, 2));
        }

        // set template index file
        // directory_path/templates/template_index.json
        const templateIndexFilePath = templatesPath + '/' + PATCHING.TEMPLATE_INDEX_FILE_NAME;
        const existsTemplateIndexFile = await fs.start(templateIndexFilePath);
        if (!existsTemplateIndexFile) {
            await fs.writeFile(templateIndexFilePath, JSON.stringify(PATCHING.INITIAL_TEMPLATE_INDEX_FILE_CONTENT, null, 2));
        }
        electronStore.set(PATCHING.TEMPLATE_INDEX_FILE_PATH_KEY, templateIndexFilePath);

        // set template list file
        // directory_path/templates/template_list.json
        const templateListFilePath = templatesPath + '/' + PATCHING.TEMPLATE_LIST_FILE_NAME;
        const existsTemplateListFile = await fs.start(templateListFilePath);
        if (!existsTemplateListFile) {
            await fs.writeFile(templateListFilePath, JSON.stringify(PATCHING.INITIAL_TEMPLATE_LIST_FILE_CONTENT, null, 2));
        }
        electronStore.set(PATCHING.TEMPLATE_LIST_FILE_PATH_KEY, templateListFilePath);

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
                <Form.Item name={['path']} label="Workspace path" rules={[{ required: true }]}>
                    <Space direction="horizontal" style={{ width: '100%' }}>
                        <Input
                            style={{ minWidth: 400 }}
                            disabled={disable}
                            onInput={(e) => setPath(e.currentTarget.value.trim())}
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