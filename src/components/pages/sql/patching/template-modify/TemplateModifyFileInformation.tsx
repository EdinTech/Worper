import { useState, useEffect } from 'react';
import { Card, Form, Input, } from 'antd';
import { TemplateIndex, TemplateModifyFileInformation } from '../../../../util/interface/pages';
import useTemplate from '../../../../util/hooks/useTemplate';
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { TextArea } = Input;


const TemplateModifyFileInformation: React.FC<TemplateModifyFileInformation> = ({ templateListItem, setTemplateListItem, setDisabled }) => {

    const { templateIndexManager } = useTemplate();
    const [templateIndex, setTemplateIndex] = useState<TemplateIndex>();
    const [existsFileName, setExistsFileName] = useState(false);
    useEffect(() => {
        templateIndexManager
            .get()
            .then(setTemplateIndex)
    }, []);

    useEffect(() => {
        const timeoutFunc = setTimeout(() => {
            if (templateIndex && templateIndex.title_index[templateListItem.templateTitle]) {
                setDisabled(true);
                setExistsFileName(true);
            } else {
                setDisabled(false);
                setExistsFileName(false);
            }
        }, 500);

        return () => {
            clearTimeout(timeoutFunc);
        }
    }, [templateListItem.templateTitle]);

    return (
        <Card title="File Information" style={{ marginBottom: 16 }}>
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
                        value={templateListItem.templateTitle}
                        prefix={existsFileName ? <><ExclamationCircleOutlined />File name is already exists</> : undefined}
                        onChange={(e) => setTemplateListItem({ ...templateListItem, templateTitle: e.target.value })}
                        maxLength={50}
                    />
                </Form.Item>
                <Form.Item label="File Description">
                    <TextArea
                        showCount
                        rows={2}
                        value={templateListItem.description}
                        placeholder="File Description."
                        onChange={(e) => setTemplateListItem({ ...templateListItem, description: e.target.value })}
                        maxLength={200}
                    />
                </Form.Item>
            </Form>
        </Card>
    );
}

export default TemplateModifyFileInformation;