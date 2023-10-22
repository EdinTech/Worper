import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export interface AppResultProps {
    status: "success" | "error" | "info" | "warning" | 404 | 403 | 500
    title: string;
    subTitle: string;
    returnPath: string;
}

const AppResult: React.FC<AppResultProps> = ({ status, title, subTitle, returnPath }) => {

    const navigate = useNavigate();

    return <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={[
            <Button type="primary" key="console">
                Go Dashboard
            </Button>,
            <Button onClick={() => navigate(returnPath) }>Go Back</Button>,
        ]}
    />
};

export default AppResult;