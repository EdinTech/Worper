import { Card, Form, Input, Modal, Descriptions, Space, Button } from "antd";
import { FileContentProps } from "../../../../util/interface/pages";
import TextArea from "antd/es/input/TextArea";
import useFileSystem from "../../../../util/hooks/useFileSystem";
import { useEffect, useState } from "react";
import useElectronStore from "../../../../util/hooks/useElectronStore";
import { PATCHING } from "../../../../util/const/setting";
import { ExclamationCircleOutlined, CopyOutlined } from "@ant-design/icons";
import useMessage from "../../../../util/hooks/useMessage";


const FileContent: React.FC<FileContentProps> = ({ fileState, setFileState, setDisabled }) => {

    const { fs } = useFileSystem();
    const { electronStore } = useElectronStore();
    const { message, contextHolder } = useMessage();
    const [fileNames, setFileNames] = useState<string[]>();
    const [existsFileName, setExistsFileName] = useState(false);
    useEffect(() => {
        (async () => {
            let outputPath = await electronStore.get(PATCHING.DEFAULT_OUTPUT_DIRECTORY_PATH_KEY)
            if (!outputPath) {
                return;
            }
            const customOutputPath = await electronStore.get(PATCHING.OUTPUT_DIRECTORY_PATH_KEY);
            if (customOutputPath) {
                outputPath = customOutputPath;
            }
            fs.readdir(outputPath).then(setFileNames);
        })();
    }, [])

    const checkExistsFileName = () => {

        if (!fileState.isChanged) {
            return;
        }

        if (!fileNames || fileNames.length === 0) {
            return;
        }

        if (fileState.originName !== fileState.name && fileNames.includes(fileState.name)) {
            setExistsFileName(true);
            setDisabled(true);
            return;
        }

        setExistsFileName(false);
        setDisabled(false);
    }

    const onCopyHandler = () => {
        navigator.clipboard.writeText(fileState.path)
        message.success("Path copied!")
    }

    const info = () => {
        Modal.info({
            title: 'Detail',
            width: 800,
            content: (
                <>
                    <Descriptions column={1} size='small' bordered
                        items={[
                            { key: 1, label: "path", children: <Space size="small">{fileState.path}<Button type="text" onClick={onCopyHandler} icon={<CopyOutlined />} /></Space> },
                            { key: 2, label: "name", children: fileState.originName },
                            { key: 3, label: 'created time', children: fileState.birthtime },
                            { key: 5, label: "updated time", children: fileState.mtime },
                        ]}
                    />
                </>
            ),
        });
    }

    return (
        <>
            {contextHolder}
            <Card title="Information" style={{ marginBottom: 16 }} extra={<a onClick={info}>Detail</a>}>
                <Form
                    layout={"vertical"}
                    initialValues={{ layout: "vertical" }}
                    style={{ width: "100%" }}
                >
                    <Form.Item label="File Name" required>
                        <Input
                            showCount
                            required={true}
                            status={existsFileName ? "error" : undefined}
                            value={fileState.name}
                            prefix={existsFileName ? <><ExclamationCircleOutlined />File name is already exists</> : undefined}
                            onBlur={() => checkExistsFileName()}
                            onChange={(e) => setFileState({ ...fileState, name: e.target.value, isChanged: true })}
                            maxLength={100}
                        />
                    </Form.Item>
                    <Form.Item label="File Content">
                        <TextArea
                            showCount
                            rows={30}
                            value={fileState.content}
                            placeholder="Sql"
                            onChange={(e) => setFileState({ ...fileState, content: e.target.value, isChanged: true })}
                        />
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}

export default FileContent;