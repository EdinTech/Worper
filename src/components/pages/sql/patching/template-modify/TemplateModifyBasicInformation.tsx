import { Card, Form } from 'antd';
import InputTableControl from './ui/InputTableControl';
import InputActionControl from './ui/InputActionControl';
import CheckerControl from './ui/CheckerControl';
import ApplierControl from './ui/ApplierControl';
import type { TemplateModifyControlOnChangeState, TemplateModifyFormProps } from '../../../../util/interface/pages';

const TemplateModifyBasicInformation: React.FC<TemplateModifyFormProps> = ({ template, setTemplate }) => {
    const [form] = Form.useForm();

    const onChangeState: TemplateModifyControlOnChangeState = ({ type, value }) => {

        setTemplate(preState => {
            return { ...preState, [type]: value };
        });
    }

    return (
        <>
            <Card title="Basic Information" style={{ marginBottom: 16 }}>
                <Form
                    layout={"vertical"}
                    form={form}
                    initialValues={{ layout: "vertical" }}
                    style={{ width: "100%" }}
                >
                    {/* applier component */}
                    <ApplierControl template={template} onChangeState={onChangeState} />

                    {/* checker component */}
                    <CheckerControl template={template} onChangeState={onChangeState} />

                    {/* input table component */}
                    <InputTableControl template={template} onChangeState={onChangeState} />

                    {/* input action component */}
                    <InputActionControl template={template} onChangeState={onChangeState} />
                </Form>
            </Card>
        </>
    );
}

export default TemplateModifyBasicInformation;