import AppPageTitle from '../../../../ui/AppPageTitle';
import React, { useState } from 'react';
import { Divider, Radio, Table, Tag, Button, Dropdown, Space, Typography  } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';

interface DataType {
    key: React.Key;
    template: string;
    description: string;
    tag: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Template',
        dataIndex: 'template',
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
    {
        title: 'tag',
        dataIndex: 'tag',
        render: (tags: string[]) => (
            <>
                {tags.map((tag) => (
                    <Tag color="blue" key={tag}>
                        {tag}
                    </Tag>
                ))}
            </>
        )
    },
];

const data: DataType[] = [
    {
        key: '1',
        template: 'John Brown',
        description: 'New York No. 1 Lake Park',
        tag: ['node', 'php']
    },
    {
        key: '2',
        template: 'Jim Green',
        description: 'London No. 1 Lake Park',
        tag: ['node']
    },
    {
        key: '3',
        template: 'Joe Black',
        description: 'Sydney No. 1 Lake Park',
        tag: []
    },
    {
        key: '4',
        template: 'Disabled User',
        description: 'Sydney No. 1 Lake Park',
        tag: []
    },
];

const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

const { Text } = Typography;

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Text>
                Edit
            </Text>
        ),
    },
    {
        key: '2',
        label: (
            <Text type='danger'>
                Delete
            </Text>
        ),
    },
];

const PatchingTemplatePage: React.FC = () => {
    return (
        <>
            <AppPageTitle>Sql Templates</AppPageTitle>
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
                <Space>
                    <Dropdown menu={{ items }} placement="bottomRight">
                        <Button>
                            <Space>
                                Action
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    <Button type="primary">
                            Register
                    </Button>
                </Space>
            </div>
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </>
    )
}

export default PatchingTemplatePage;