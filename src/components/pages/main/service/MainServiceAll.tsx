import VirtualList from 'rc-virtual-list';
import { List } from 'antd';
import { ServiceInformation } from '../../../util/interface/main';
import { serviceInformations } from '../../../util/const/service';
import { CodeSandboxOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const getIcon = (parentCategory: string) => {
    if (parentCategory == 'Sql') {
        return <CodeSandboxOutlined style={{ fontSize: "30px" }} />
    }
    return null;
}

const MainServiceAll = () => {
    return (
        <>
            <List>
                <VirtualList
                    data={serviceInformations}
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
    )
}

export default MainServiceAll;