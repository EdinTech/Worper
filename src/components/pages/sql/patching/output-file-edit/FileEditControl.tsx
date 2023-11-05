import { Button, Space } from "antd";
import { FileEditControlProps } from "../../../../util/interface/pages";

const FileEditControl: React.FC<FileEditControlProps> = ({ onUpdate, disabled }) => {
    return (
        <>
            <div style={{ textAlign: "right" }}>
                <Space>
                    <Button type="primary" shape="round" size={'large'} onClick={onUpdate} disabled={disabled}>
                        Update
                    </Button>
                </Space>
            </div>
        </>
    )
}

export default FileEditControl;