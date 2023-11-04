import { useEffect, useRef, useState } from 'react';
import { Form, Select, Space, Divider, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import type { TemplateModifyControl } from '../../../../../util/interface/pages';
import usePatchingSetting from '../../../../../util/hooks/usePatchingSetting';

let index = 0;

const PBApplierControl: React.FC<TemplateModifyControl> = ({ template, onChangeState }) => {

    const { getSetting } = usePatchingSetting();

    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {

        (async () => {
            const setting = await getSetting();
            setItems(setting.members);
            onChangeState({ type: 'applier', value: setting.default_applicant })
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
        <Form.Item label="Applicant">
            <Space>
                <Select
                    defaultValue={template.applier}
                    style={{ width: 300 }}
                    onChange={value => onChangeState({ type: 'applier', value })}
                    value={template.applier}
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

export default PBApplierControl;