import { Form, Select, Space, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { PBControl } from '../../../../../util/interface/pages';


const PBApplierControl: React.FC<PBControl> = ({ state, onChangeState }) => {

    return <>
        <Form.Item label="Applying Date & Applicant">
            <Space>
                <DatePicker
                    defaultValue={dayjs(state.applyingDate, 'YYYYMMDD')}
                    format={'YYYYMMDD'}
                    onChange={(_, date) => onChangeState({type: 'applyingDate', value: date})} />
                <Select
                    defaultValue={state.applier}
                    style={{ width: 120 }}
                    options={[
                        { value: '情シス開発保守運用2', label: '情シス' },
                    ]}
                    onChange={value => onChangeState({type: 'applier', value})}
                />
            </Space>
        </Form.Item>
    </>
}

export default PBApplierControl;