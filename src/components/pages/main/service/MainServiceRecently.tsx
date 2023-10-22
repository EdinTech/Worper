import React, { useEffect, useState } from 'react';
import VirtualList from 'rc-virtual-list';
import { List } from 'antd';
import { ServiceInformation } from '../../../util/interface/main';
import useServiceAccessHistory from '../../../util/hooks/useServiceAccessHistory';
import { serviceInformations } from '../../../util/const/service';
import { CodeSandboxOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const getIcon = (parentCategory: string) => {
    if (parentCategory == 'Sql') {
        return <CodeSandboxOutlined style={{ fontSize: "30px" }} />
    }
    return null;
}

const MainServiceRecently = () => {
    const { getStoreHistoryOrderBy } = useServiceAccessHistory();
    const [data, setData] = useState<ServiceInformation[]>();
    
    useEffect(() => {
        (async () => {
            const history = await getStoreHistoryOrderBy(5);

            const fetchedData: ServiceInformation[] = [];

            history.forEach(h => {
                const info = serviceInformations.find(v => v.id == h[0]);
                if (info) {
                    fetchedData.push(info);
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
                    {(item: ServiceInformation) => (
                        <List.Item key={item.title}>
                            <List.Item.Meta
                                avatar={getIcon(item.parentCategory)}
                                title={<Link to={item.path}>{item.title}</Link>}
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