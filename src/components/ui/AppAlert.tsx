import { Alert, Space } from 'antd';
import { AppAlertProps } from '../util/interface/ui';

const AppAlert: React.FC<AppAlertProps> = ({messages, showIcon, closable, type, action}) => {
    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }}>
                {messages.map(message => {
                    return (
                        <Alert
                            message={message[0]}
                            description={message[1]}
                            type={type}
                            closable={closable}
                            showIcon={showIcon}
                            key={message[0]}
                            style={{ marginBottom: 16 }}
                            action={action}
                        />
                    )
                })}
            </Space>
        </>
    )
}

export default AppAlert;