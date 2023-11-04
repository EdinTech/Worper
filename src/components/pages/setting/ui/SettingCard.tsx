import { Card, Tour } from 'antd';
import InfoIcon from "./SettingInfoIcon";
import { SettingCardProps } from '../../../util/interface/pages';

const SettingCard: React.FC<SettingCardProps> = ({ title, steps, children, tourOpen, setTourOpen }) => {

    return (
        <>
            <Card
                title={title}
                style={{ width: "100%", minWidth: 680, marginBottom: 16 }}
                extra={<InfoIcon onClick={() => setTourOpen(true)} />}
            >
                {children}
            </Card >

            <Tour open={tourOpen} onClose={() => setTourOpen(false)} steps={steps} />
        </>
    );
}

export default SettingCard;