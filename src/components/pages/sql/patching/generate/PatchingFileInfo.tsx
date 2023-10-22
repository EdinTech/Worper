import { useEffect, useState } from 'react';
import { Card, Descriptions, } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { GetFileName, PatchingFileInfoProps } from '../../../../util/interface/pages';

export const getFileName: GetFileName = (patchingFile, extension) => {
    let fileName = `${patchingFile.id}_apply${patchingFile.applyingDate}${patchingFile.applier}_check${patchingFile.checkingDate}${patchingFile.checker}_${patchingFile.tableName}_${patchingFile.action}`;
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