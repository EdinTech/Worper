import { Card, Tour } from 'antd';
import type { TourProps } from 'antd';
import InfoIcon from "./SettingInfoIcon";

export interface SettingCardProps {
    title: string;
    steps: TourProps['steps'];
    children: React.ReactNode;
    tourOpen: boolean;
    setTourOpen: (open: boolean) => void;
}

const styles = {
    card: { width: "100%", minWidth: 680, marginBottom: 16 }
}

const SettingCard: React.FC<SettingCardProps> = ({ title, steps, children, tourOpen, setTourOpen }) => {

    return (
        <>
            <Card title={title} style={styles.card} extra={<InfoIcon onClick={() => setTourOpen(true)} />}>
                {children}
            </Card >

            <Tour open={tourOpen} onClose={() => setTourOpen(false)} steps={steps} />
        </>
    );
}

export default SettingCard;