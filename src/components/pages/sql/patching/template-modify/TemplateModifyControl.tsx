import { Button, Space } from 'antd';
import { TemplateModifyControlProps } from '../../../../util/interface/pages';

const TemplateModifyControl: React.FC<TemplateModifyControlProps> = ({ onCreate, onUpdate, mode, disabled }) => {

    return <>
        <div style={{ textAlign: "right" }}>
            <Space>
                {mode === "update" && <Button type="primary" shape="round" size={'large'} onClick={onUpdate} disabled={disabled}>Update</Button>}
                {mode === "create" && <Button type="primary" shape="round" size={'large'} onClick={onCreate} disabled={disabled}>Generate</Button>}
            </Space>
        </div>
    </>
}

export default TemplateModifyControl;