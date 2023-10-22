import { InfoCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const InfoIcon: React.FC<{onClick: () => void}> = ({onClick}) => {
    return (
        <Button type="text" shape="circle" icon={<InfoCircleOutlined />} onClick={onClick} />
    );
}

export default InfoIcon;