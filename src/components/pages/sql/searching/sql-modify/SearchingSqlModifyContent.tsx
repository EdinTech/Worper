import { Card, Form, Input } from "antd";
import { SearchingSqlModifyContentProps } from "../../../../util/interface/pages";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import useFileSystem from "../../../../util/hooks/useFileSystem";
import useSetting from "../../../../util/hooks/useSetting";

const SearchingSqlModifyContent: React.FC<SearchingSqlModifyContentProps> = ({ fileName, setFileName, fileContent, setFileContent, setDisabled }) => {

    const [originFileName, setOriginFileName] = useState<string>();
    const [existsFileName, setExistsFileName] = useState(false);
    const { fs } = useFileSystem();
    const { setting } = useSetting();

    useEffect(() => {
        setOriginFileName(fileName);
    })

    const checkExistsFileName = async () => {
        if (!fileName) {
            return;
        }
        if (originFileName === fileName) {
            return;
        }
        const path = await setting.getSqlDirectoryPath();
        const exists = await fs.start(`${path}/${fileName}`);
        setExistsFileName(exists);
        setDisabled(exists);
    }

    const onChangeFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value)
    }

    const onChangeFileContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFileContent(e.target.value)
    }
    return (
        <>
            <Card title="Information" style={{ marginBottom: 16 }}>
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
                            value={fileName}
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
                            value={fileContent}
                            placeholder="Sql"
                            onChange={onChangeFileContent}
                        />
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default SearchingSqlModifyContent;