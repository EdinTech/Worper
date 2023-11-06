import React, { useEffect, useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { path } from '../util/const/path';

const { Content } = Layout;

const AppLayoutContent: React.FC<{ collapsed: boolean, children: React.ReactNode }> = ({ collapsed, children }) => {

    const [layoutMarginLeft, setLayoutMarginLeft] = useState(200);
    const location = useLocation();
    const getItemTitle = () => {
        const currentPath = location.pathname;
        if (currentPath === path.main_window) {
            return;
        }
        const pathSegments = location.pathname.split('/');
        const lastPathSegment = location.pathname.split('/').pop();

        const output = pathSegments.map((parent) => ({ title: parent }));

        if (pathSegments.length > 0) {
            output.pop();
            output.push({ title: lastPathSegment });
        }

        return output;
    };

    useEffect(() => {
        if (collapsed) {
            setLayoutMarginLeft(82);
        } else {
            setLayoutMarginLeft(200);
        }
    }, [collapsed])

    return (
        <Layout style={{ marginLeft: layoutMarginLeft, transition: "all 0.2s ease 0s" }}>
            <Content style={{ margin: '16px' }}>
                <Breadcrumb
                    items={getItemTitle()}
                    style={{ marginBottom: '8px' }}
                />
                {children}
            </Content>
        </Layout>
    )
}

export default AppLayoutContent;