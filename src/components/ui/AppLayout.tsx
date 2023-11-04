import React, { useState } from 'react';
import { Layout } from 'antd';
import AppLayoutSider from './AppLayoutSider';
import AppLayoutContent from './AppLayoutContent';


const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(true);
    const onClickSider = (value: boolean) => {
        setCollapsed(value);
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>

            {/* side menu component */}
            <AppLayoutSider onClick={onClickSider} collapsed={collapsed} />

            {/* main content component */}
            <AppLayoutContent collapsed={collapsed}>

                {/* children component */}
                {children}

            </AppLayoutContent>
        </Layout>
    );
};

export default AppLayout;
