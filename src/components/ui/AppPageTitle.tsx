import { Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AppPageTitle: React.FC<{ children: React.ReactNode, previousPage?: string, previousPath?: string }> = ({ children, previousPage, previousPath }) => {
    return (
        <>
            {previousPage && <>
                <Title level={5} style={{ margin: 16, marginBottom: 8 }}>
                    <Link to={previousPath} style={{ color: '#BFBFBF' }}>
                        <Space align="center" size="small">
                            <LeftOutlined style={{ fontSize: 13 }} /> {previousPage}
                        </Space>
                    </Link>
                </Title>
            </>
            }
            <Title level={3} style={{ margin: 16, marginTop: previousPage ? 0 : 16 }}>{children}</Title>
        </>
    )
}

export default AppPageTitle;