import React from 'react';
import { Button, Dropdown, Space, Typography, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { SearchingSqlControlProps } from '../../../../util/interface/pages';

const { Text } = Typography;

const config = {
    title: 'Delete the Sql File',
    content: (
        <>Are you sure to delete this Sql File? </>
    ),
};

const SearchingSqlControl: React.FC<SearchingSqlControlProps> = ({ isChecked, isValidated, selectedFileLength, onDelete, onUpdate, onCreate }) => {

    const [modal, contextHolder] = Modal.useModal();

    const items: MenuProps['items'] = [
        {
            key: '1', label: <Text disabled={selectedFileLength !== 1}>Update</Text>,
            onClick: () => {
                if (selectedFileLength === 1) {
                    onUpdate();
                }
            }
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
                    <Button type='primary' disabled={!isValidated} onClick={onCreate}>Create</Button>
                </Space>
            </div>
        </>
    )
}

export default SearchingSqlControl;