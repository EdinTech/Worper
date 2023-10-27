import { Card, Form, Input, } from 'antd';
import type { TemplateModifyFileInformation } from '../../../../util/interface/pages';

const { TextArea } = Input;

const TemplateModifyFileInformation: React.FC<TemplateModifyFileInformation> = ({ templateListItem, setTemplateListItem }) => {

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
                        value={templateListItem.template}
                        onChange={(e) => setTemplateListItem({ ...templateListItem, template: e.target.value })}
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