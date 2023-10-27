import { Button, Modal, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export interface TemplateModifyControlProps {
    onCreate: () => void;
    onDelete: () => void;
    onUpdate: () => void;
    type: "create" | "modify";
}

const config = {
    title: 'Delete the task',
    content: (
        <>Are you sure to delete this Template? </>
    ),
};

const TemplateModifyControl: React.FC<TemplateModifyControlProps> = ({ onCreate, onDelete, onUpdate, type }) => {

    const [modal, contextHolder] = Modal.useModal();

    return <>
        {contextHolder}
        <div style={{ textAlign: "right" }}>
            <Space>
                {type === "modify" && <Button type="primary" shape="round" size={'large'} onClick={onUpdate}>
                    Update
                </Button>}
                {type === "modify" && <Button type="text" shape="round" icon={<DeleteOutlined />} size={'large'} onClick={async () => {
                    const confirmed = await modal.confirm(config);
                    confirmed && onDelete();
                }} danger>
                    Delete
                </Button>}
                {type === "create" && <Button type="primary" shape="round" size={'large'} onClick={onCreate}>
                    Generate
                </Button>}
            </Space>
        </div>
    </>
}

export default TemplateModifyControl;