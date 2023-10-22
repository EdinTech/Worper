import { Typography } from 'antd';
const { Title } = Typography;

const AppPageTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Title level={3} style={{ margin: 16 }}>{children}</Title>
}

export default AppPageTitle;