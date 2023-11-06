import { useEffect, useState } from "react";
import { Card, Form, Input, Modal, Descriptions, Space, Button } from "antd";
import { ExclamationCircleOutlined, CopyOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import useFileSystem from "../../../../util/hooks/useFileSystem";
import useMessage from "../../../../util/hooks/useMessage";
import { FileContentProps } from "../../../../util/interface/pages";


const FileContent: React.FC<FileContentProps> = ({ fileState, setFileState, setDisabled }) => {

    const [existsFileName, setExistsFileName] = useState(false);
    const { message, contextHolder } = useMessage();
    const { fs } = useFileSystem();

    const checkExistsFileName = async () => {

        if (!fileState.name) {
            return;
        }
        if (fileState.originName === fileState.name) {
            return;
        }

        const exists = await fs.start(`${fileState.path}/${fileState.name}`);
        setExistsFileName(exists);
        setDisabled(exists);
    }

    const onChangeFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileState({ ...fileState, name: e.target.value, isChanged: true })
    }

    const onChangeFileContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFileState({ ...fileState, content: e.target.value, isChanged: true })
    }

    const onCopyHandler = () => {
        navigator.clipboard.writeText(fileState.path)
        message.success("Path copied!")
    }

    const openModal = () => {
        Modal.info({
            title: 'Detail',
            width: 800,
            content: (<>
                <Descriptions
                    column={1}
                    size='small'
                    bordered
                    items={[
                        { key: 1, label: "path", children: <Space size="small">{fileState.path}<Button type="text" onClick={onCopyHandler} icon={<CopyOutlined />} /></Space> },
                        { key: 2, label: "name", children: fileState.originName },
                        { key: 3, label: 'created time', children: fileState.birthtime },
                        { key: 5, label: "updated time", children: fileState.mtime },
                    ]}
                />
            </>),
        });
    }

    return (
        <>
            {contextHolder}
            <Card title="Information" style={{ marginBottom: 16 }} extra={<a onClick={openModal}>Detail</a>}>
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
                            onBlur={checkExistsFileName}
                            onChange={onChangeFileName}
                            maxLength={100}
                        />
                    </Form.Item>
                    <Form.Item label="File Content">
                        <TextArea
                            showCount
                            rows={30}
                            value={fileState.content}
                            placeholder="Sql"
                            onChange={onChangeFileContent}
                        />
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}

export default FileContent;