import { useEffect, useState } from 'react';
import { Card, Descriptions, } from 'antd';
import { DescriptionsProps } from 'antd';
import { GetFileName, PatchingFileInfoProps } from '../../../../util/interface/pages';

export const getFileName: GetFileName = (file, extension) => {
    let fileName = `${file.id}_apply${file.applyingDate}${file.applier}_check${file.checkingDate}${file.checker}_${file.tableName}_${file.action}`;
    if (extension) {
        fileName += `.${extension}`;
    }
    return fileName;
}

const PatchingFileInfo: React.FC<PatchingFileInfoProps> = ({ outputPath, state }) => {

    const [items, setItems] = useState<DescriptionsProps['items']>();

    useEffect(() => {
        setItems([
            {
                key: '1',
                label: 'Path',
                children: outputPath,
            },
            {
                key: '2',
                label: 'File',
                children: getFileName(state, 'sql'),
            },
        ])
    }, [outputPath, state])

    return (
        <Card title="File Info" style={{ marginBottom: 16 }}>
            <Descriptions items={items} column={1} bordered />
        </Card>
    );
}

export default PatchingFileInfo;