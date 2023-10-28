import { Button, } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const PatchingControl: React.FC<{onGenerate: () => void, isLoading: boolean, disabled: boolean}> = ({ onGenerate, isLoading, disabled }) => {
    return <>
        <div style={{ textAlign: "right" }}>
            <Button type="primary" shape="round" icon={<DownloadOutlined />} size={'large'} onClick={onGenerate} loading={isLoading} disabled={disabled}>
                Generate
            </Button>
        </div>
    </>
}

export default PatchingControl;