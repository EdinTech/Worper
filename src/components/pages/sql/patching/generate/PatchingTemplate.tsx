import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Space, Cascader } from 'antd';
import { path } from '../../../../util/const/path';

interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}

const options: Option[] = [
    {
        value: '1',
        label: 'Bookmark',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
            },
        ],
    },
    {
        value: '2',
        label: 'All',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
            },
        ],
    },
];

const PatchingTemplate: React.FC = () => {

    const [value, setValue] = useState<[string, string]>();
    const onChangeCascader = (value: [string, string]) => {
        setValue(value);
    };

    return <>
        <Card title="SQL Template" style={{ marginBottom: 16 }}>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Cascader options={options} onChange={onChangeCascader} placeholder="Please select" style={{ width: '100%' }} value={value} />
                <Space>
                    Create or edit templates <Link to={path.patchingTemplateEdit}>Click here.</Link>
                </Space>
            </Space>
        </Card>
    </>
}

export default PatchingTemplate;