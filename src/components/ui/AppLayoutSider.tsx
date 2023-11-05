import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, CodeSandboxOutlined, SettingOutlined } from '@ant-design/icons';
import { path } from '../util/const/path';
import type { GetItemFunction, MenuItem } from '../util/interface/ui';

const { Sider } = Layout;

const getItem: GetItemFunction = (label, key, icon, children) => {
    return { key, icon, children, label };
};

const items: MenuItem[] = [
    getItem('Dashboard', path.main , <HomeOutlined />),
    getItem('SQL', 'Sql', <CodeSandboxOutlined />, [
        getItem('Patching', 'Patching', null, [
            getItem('Generate', path.patchingGenerate),
            getItem('Template', path.patchingTemplate),
            getItem('Output', path.patchingOutputFile),
        ]),
        getItem('Searching', 'Searching', null, [
            getItem('SQL Files', path.searchingSql),
        ]),
    ]),
    // getItem('Test', path.test),
];

const bottomItems: MenuItem[] = [
    getItem('Setting', path.setting , <SettingOutlined />),
];

const AppLayoutSider: React.FC<{ onClick: (value: boolean) => void, collapsed: boolean}> = ({ onClick, collapsed }) => {

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onClickMenu = (e: any) => {
        navigate(e.key);
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onClick}
            style={{ position: "fixed", overflow: "auto", top: 0, bottom: 0, left: 0, zIndex: 1 }}
        >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['/main_window']} mode="inline" items={items} onClick={onClickMenu} />
            <Menu selectedKeys={[]} theme="dark" mode="inline" items={bottomItems} style={{ position: "absolute", bottom: 50 }} onClick={onClickMenu}/>
        </Sider>
    );
}

export default AppLayoutSider;