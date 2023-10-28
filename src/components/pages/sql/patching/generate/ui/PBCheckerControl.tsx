import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Form, Select, Space, DatePicker, Divider, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import type { PBControl } from '../../../../../util/interface/pages';
import usePatchingSetting from '../../../../../util/hooks/usePatchingSetting';

let index = 0;

const PBCheckerControl: React.FC<PBControl> = ({ state, onChangeState }) => {

    const { useSetting } = usePatchingSetting();

    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {

        (async () => {
            const setting = await useSetting();
            if (!setting) {
                return;
            }
            setItems(setting.members);
            onChangeState({ type: 'checker', value: setting.default_checker })
        })();

    }, []);


    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    return <>
        <Form.Item label="Checking Date & Checker">
            <Space>
            <DatePicker
                    defaultValue={dayjs(state.checkingDate, 'YYYYMMDD')}
                    format={'YYYYMMDD'}
                    onChange={(_, date) => onChangeState({type: 'applyingDate', value: date})} />
                <Select
                    defaultValue={state.checker}
                    style={{ width: 300 }}
                    onChange={value => onChangeState({type: 'checker', value})}
                    value={state.checker}
                    dropdownRender={menu => (
                        <>
                            {menu}
                            <Divider style={{ margin: '8px 0' }} />
                            <Space style={{ padding: '0 8px 4px' }}>
                                <Input
                                    placeholder="Please enter item"
                                    ref={inputRef}
                                    value={name}
                                    onChange={onNameChange}
                                    onKeyDown={(e) => e.stopPropagation()}
                                />
                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                    Add Member
                                </Button>
                            </Space>
                        </>
                    )}
                    options={items.map((item) => ({ label: item, value: item }))}
                />
            </Space>
        </Form.Item>
    </>
}

export default PBCheckerControl;