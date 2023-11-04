import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import VirtualList from 'rc-virtual-list';
import { List, Typography  } from 'antd';
import { CodeSandboxOutlined } from '@ant-design/icons';

import useServiceAccessHistory from '../../../util/hooks/useServiceAccessHistory';
import { serviceInformations } from '../../../util/const/service';
import { MainServiceRecentlyProps } from '../../../util/interface/pages';

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
    const { history } = useServiceAccessHistory();
    const [data, setData] = useState<MainServiceRecentlyProps[]>();

    useEffect(() => {
        (async () => {
            const histories = await history.get(5);

            const fetchedData: MainServiceRecentlyProps[] = [];
            histories.forEach(h => {
                const serviceTitle = h[0];
                const serviceAccessTime = h[1];
                const info = serviceInformations.find(v => v.title === serviceTitle);
                if (info) {
                    fetchedData.push({
                        ...info,
                        accessTime: serviceAccessTime
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
                                            {getCompareTime(item.accessTime)}
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