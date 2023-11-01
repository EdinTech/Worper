import { useEffect, useState } from 'react';
import { Button, Descriptions, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import useMessage from '../../../../util/hooks/useMessage';
import { GenerateResultSuccessSubTitleProps } from '../../../../util/interface/pages';

const GenerateResultSuccessSubTitle: React.FC<GenerateResultSuccessSubTitleProps> = ({ filePath, fileName }) => {

    const { message, contextHolder } = useMessage()

    const [items, setItems] = useState([]);

    const onCopyHandler = () => {
        navigator.clipboard.writeText(filePath)
        message.success("Path copied!")
    }

    useEffect(() => {
        setItems([
            {
                key: '1',
                label: 'Path',
                children: <Space> {filePath} <Button type="text" onClick={onCopyHandler} icon={<CopyOutlined />} /> </Space>,
            },
            {
                key: '2',
                label: 'File',
                children: fileName,
            },
        ])
    }, [filePath, filePath]);

    return (<>
        {contextHolder}
        <Descriptions column={1} bordered items={items} />
    </>)
}

export default GenerateResultSuccessSubTitle;