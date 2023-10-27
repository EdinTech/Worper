import { Card, Form, InputNumber } from 'antd';
import PBInputTableControl from './ui/PBInputTableControl';
import PBInputActionControl from './ui/PBInputActionControl';
import PBCheckerControl from './ui/PBCheckerControl';
import PBApplierControl from './ui/PBApplierControl';
import type { PatchingComponentProps, PBIOnChangeState } from '../../../../util/interface/pages';


const PatchingBasicInformation: React.FC<PatchingComponentProps> = ({ state, setState }) => {
    const [form] = Form.useForm();

    const onChangeState: PBIOnChangeState = ({ type, value }) => {
        setState(preState => {
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
                    {/* number component */}
                    <Form.Item label="Number">
                        <InputNumber min={0} max={9999} defaultValue={state.id} onChange={(value) => onChangeState({ type: 'id', value })} />
                    </Form.Item>

                    {/* applier (date, user) component */}
                    <PBApplierControl state={state} onChangeState={onChangeState} />

                    {/* checker (date, user) component */}
                    <PBCheckerControl state={state} onChangeState={onChangeState} />

                    {/* input table component */}
                    <PBInputTableControl state={state} onChangeState={onChangeState} />

                    {/* input action component */}
                    <PBInputActionControl state={state} onChangeState={onChangeState} />
                </Form>
            </Card>
        </>
    );
}

export default PatchingBasicInformation;