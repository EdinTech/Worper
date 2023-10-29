import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import VirtualList from 'rc-virtual-list';
import { List, Typography  } from 'antd';
import { ServiceInformation } from '../../../util/interface/main';
import useServiceAccessHistory from '../../../util/hooks/useServiceAccessHistory';
import { serviceInformations } from '../../../util/const/service';
import { CodeSandboxOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


export type MainServiceRecentlyProps = {
    createdAt: string;
} & ServiceInformation;

const getCompareTime = (accessTime: string) => {
    const compareTime = dayjs(accessTime);
    const now = dayjs();
    const diff = now.diff(compareTime, 'minute');
    if (diff < 60) {
        return `${diff} minutes ago`;
    } else if (diff < 1440) {
        return `${Math.floor(diff / 60)} hours ago`;
    } else if (diff < 43200) {
        return `${Math.floor(diff / 1440)} days ago`;
    }
}

const { Text } = Typography;

const getIcon = (parentCategory: string) => {
    if (parentCategory == 'Sql') {
        return <CodeSandboxOutlined style={{ fontSize: "30px" }} />
    }
    return null;
}

const MainServiceRecently = () => {
    const { getStoreHistoryOrderBy } = useServiceAccessHistory();
    const [data, setData] = useState<MainServiceRecentlyProps[]>();
    
    useEffect(() => {
        (async () => {
            const history = await getStoreHistoryOrderBy(5);

            const fetchedData: MainServiceRecentlyProps[] = [];
            history.forEach(h => {
                const info = serviceInformations.find(v => v.title == h[0]);
                if (info) {
                    fetchedData.push({
                        ...info,
                        createdAt: h[1]
                    });
                }
            })

            setData(fetchedData);
        })();
    }, []);

    return (
        <>
            <List>
                <VirtualList
                    data={data}
                    itemHeight={47}
                    itemKey="title"
                >
                    {(item: MainServiceRecentlyProps) => (
                        <List.Item key={item.title}>
                            <List.Item.Meta
                                avatar={getIcon(item.parentCategory)}
                                title={(
                                    <>
                                        <Link to={item.path}>{item.title}</Link> <br/>
                                        <Text italic={true} type='secondary'>
                                            {getCompareTime(item.createdAt)}
                                        </Text>
                                    </>
                                    )}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </>
    );
}

export default MainServiceRecently;