import { Form, Select, Space, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { PBControl } from '../../../../../util/interface/pages';

const PBCheckerControl: React.FC<PBControl> = ({ state, onChangeState }) => {

    return <>
        <Form.Item label="Checking Date & Checker">
            <Space>
            <DatePicker
                    defaultValue={dayjs(state.checkingDate, 'YYYYMMDD')}
                    format={'YYYYMMDD'}
                    onChange={(_, date) => onChangeState({type: 'applyingDate', value: date})} />
                <Select
                    defaultValue={state.checker}
                    style={{ width: 120 }}
                    options={[
                        { value: '神野', label: '神野' },
                        { value: '小林', label: '小林' },
                        { value: 'カン', label: 'カン' },
                        { value: '杉浦', label: '杉浦' },
                    ]}
                    onChange={value => onChangeState({type: 'checker', value})}
                />
            </Space>
        </Form.Item>
    </>
}

export default PBCheckerControl;