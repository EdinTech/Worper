import React from 'react';
import { Button, Dropdown, Space, Typography, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { GenerateTemplateControlProps } from '../../../../util/interface/pages';

const { Text } = Typography;

const config = {
    title: 'Delete the task',
    content: (
        <>Are you sure to delete this Template? </>
    ),
};

const GenerateTemplateControl: React.FC<GenerateTemplateControlProps> = ({ isChecked, isValidated, onCreate, onEdit, onDelete }) => {

    const [modal, contextHolder] = Modal.useModal();

    const items: MenuProps['items'] = [
        {
            key: '1', label: <Text>Edit</Text>,
            onClick: onEdit
        },
        {
            key: '2', label: <Text type='danger'>Delete</Text>,
            onClick: async () => {
                const confirmed = await modal.confirm(config);
                confirmed && onDelete();
            }
        },
    ];

    return (
        <>
            {contextHolder}
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
                <Space>
                    <Dropdown menu={{ items }} placement="bottomRight" disabled={!isChecked || !isValidated}>
                        <Button>
                            <Space>
                                Action
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    <Button type="primary" onClick={onCreate} disabled={!isValidated}>
                        Register
                    </Button>
                </Space>
            </div>
        </>
    )
}

export default GenerateTemplateControl;