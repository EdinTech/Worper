import { useEffect, useState } from "react";
import { Space, Button, Form, Input } from 'antd';
import useFileSystem from "../../../util/hooks/useFileSystem";
import useMessage from "../../../util/hooks/useMessage";
import { validateMessages } from "../../../util/const/validate";
import useSetting from "../../../util/hooks/useSetting";

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const PatchingSqlOutputPathControl: React.FC = () => {
    const [disable, setDisable] = useState(false);
    const [outputPath, setOutputPath] = useState('');
    const { fs, isLoading } = useFileSystem();
    const { message, contextHolder } = useMessage();

    const { setting } = useSetting();

    useEffect(() => {

        (async () => {
            const value = await setting.getOutputDirectoryPath();
            if (value) {
                setOutputPath(value);
                setDisable(true);
            }
        })();

    }, []);

    const onInputOutputPath = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOutputPath(e.currentTarget.value);
    }

    const onClickButton = async() => {

        if (disable) {
            setDisable(false);
            return;
        }

        if (outputPath.trim().length === 0) {
            setting.removeOutputDirectoryPath()
            message.success("Directory deleted.");
            return;
        }

        // set template path
        const existsDirectory = await fs.start(outputPath);
        if (!existsDirectory) {
            message.error("No find Directory.")
            return;
        }
        setting.setOutputDirectoryPath(outputPath)

        setDisable(true);
        message.success("Directory saved.");
    }

    return (
        <>
            {contextHolder}
            <Form
                {...layout}
                style={styles.form}
                validateMessages={validateMessages}
            >
                <Form.Item label="Output path">
                    <Space direction="horizontal" style={styles.space}>
                        <Input
                            style={styles.input}
                            disabled={disable}
                            onInput={onInputOutputPath}
                            value={outputPath}
                        />
                        {isLoading && <Button style={styles.button} loading></Button>}
                            {!isLoading && <Button style={styles.button} onClick={onClickButton}>{disable ? 'Edit' : 'Save'}</Button>}
                    </Space>
                </Form.Item>
            </Form>
        </>
    )
}

export default PatchingSqlOutputPathControl;

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