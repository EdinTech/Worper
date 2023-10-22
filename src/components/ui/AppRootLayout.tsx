import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AppLayoutSider from './AppLayoutSider';
import AppLayoutContent from './AppLayoutContent';


const AppLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const onClickSider = (value: boolean) => {
        setCollapsed(value);
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>

            {/* side menu component */}
            <AppLayoutSider onClick={onClickSider} collapsed={collapsed} />

            {/* main content component */}
            <AppLayoutContent collapsed={collapsed}>

                {/* outlet component */}
                <Outlet />

            </AppLayoutContent>
        </Layout>
    );
};

export default AppLayout;
