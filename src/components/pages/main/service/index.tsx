import React, { useState } from 'react';
import { Card } from 'antd';
import MainServiceRecently from './MainServiceRecently';
import MainServiceAll from './MainServiceAll';

const tabList = [
    {
        key: 'currently',
        tab: 'currently',
    },
    {
        key: 'all',
        tab: 'all',
    },
];

const contentList: Record<string, React.ReactNode> = {
    currently: <MainServiceRecently />,
    all: <MainServiceAll />,
};


const MainService = () => {
    const [activeTabKey, setActiveTabKey] = useState<string>('currently');

    const onTabChange = (key: string) => {
        setActiveTabKey(key);
    };

    return (
        <>
            <Card
                style={{ width: '100%', height: '90%', marginBottom: 16 }}
                title="Services"
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={onTabChange}
            >
                {contentList[activeTabKey]}
            </Card>
        </>
    );
}

export default MainService;