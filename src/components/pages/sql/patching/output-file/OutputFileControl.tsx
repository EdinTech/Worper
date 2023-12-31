import React from 'react';
import { Button, Dropdown, Space, Typography, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { OutputFilesControlProps } from '../../../../util/interface/pages';

const { Text } = Typography;

const OutputFileControl: React.FC<OutputFilesControlProps> = ({ isChecked, isValidated, selectedFileLength, onUpdate, onDelete }) => {

    const [modal, contextHolder] = Modal.useModal();

    const items: MenuProps['items'] = [
        {
            key: '1', label: <Text disabled={selectedFileLength !== 1}>Update</Text>,
            onClick: onUpdate
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
                </Space>
            </div>
        </>
    )
}

export default OutputFileControl;

const config = {
    title: 'Delete the Template',
    content: (
        <>Are you sure to delete this Template? </>
    ),
};