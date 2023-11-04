
import { Link } from 'react-router-dom';
import { List } from 'antd';
import VirtualList from 'rc-virtual-list';
import { CodeSandboxOutlined } from '@ant-design/icons';
import { serviceInformations } from '../../../util/const/service';
import { ServiceInformation } from '../../../util/interface/pages';

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