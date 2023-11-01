import { Button, Space } from "antd";
import { FileEditControlProps } from "../../../../util/interface/pages";

const FileEditControl: React.FC<FileEditControlProps> = ({ onUpdate, onCancel, disabled }) => {
    return (
        <>
            <div style={{ textAlign: "right" }}>
                <Space>
                    <Button type="primary" shape="round" size={'large'} onClick={onUpdate} disabled={disabled}>
                        Update
                    </Button>
                    <Button type="text" shape="round" size={'large'} onClick={onCancel} danger>
                        Cancel
                    </Button>
                </Space>
            </div>
        </>
    )
}

export default FileEditControl;