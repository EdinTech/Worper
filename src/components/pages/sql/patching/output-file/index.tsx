import AppPageTitle from '../../../../ui/AppPageTitle';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../../util/const/path';
import type { ColumnsType } from 'antd/es/table';
import useValidateSetting from '../../../../util/hooks/useValidateSetting';
import useServiceAccessHistory from '../../../../util/hooks/useServiceAccessHistory';
import useFileSystem from '../../../../util/hooks/useFileSystem';
import useElectronStore from '../../../../util/hooks/useElectronStore';
import useMessage from '../../../../util/hooks/useMessage';
import { PATCHING } from '../../../../util/const/setting';
import TemplateControl from './TemplateControl';

const columns: ColumnsType = [
    {
        title: 'File',
        dataIndex: 'file',
    }
];

const PatchingOutputFilePage = () => {

    useServiceAccessHistory({ log: true });

    const navigate = useNavigate();
    const [files, setFiles] = useState<ColumnsType>();
    const [selectedFilePaths, setSelectedFilePaths] = useState<string[]>();
    const { isValidated, appAlert } = useValidateSetting();
    const { electronStore } = useElectronStore();
    const { message, contextHolder } = useMessage();
    const { fs } = useFileSystem();

    useEffect(() => {
        (async () => {
            let outputPath = await electronStore.get(PATCHING.DEFAULT_OUTPUT_DIRECTORY_PATH_KEY)
            if (!outputPath) {
                return;
            }
            const customOutputPath = await electronStore.get(PATCHING.OUTPUT_DIRECTORY_PATH_KEY);
            if (customOutputPath) {
                outputPath = customOutputPath;
            }
            const files = await fs.readdir(outputPath);
            const fileKeyFilePairs = files.map(file => ({ key: `${outputPath}/${file}`, file }));
            setFiles(fileKeyFilePairs);
        })();
    }, []);

    const onDelete = () => {
        selectedFilePaths.forEach(filePath => {
            setFiles(prevState => (prevState?.filter(file => file.key !== filePath)));
            fs.unlink(filePath);
        });
        message.success("deleted!");
    }

    const onEdit = () => {
        navigate(path.patchingOutputFileEdit, {
            state: {
                filePath: selectedFilePaths[0]
            }
        });
    }

    const onChange = (selectedRowKeys: string[]) => {
        setSelectedFilePaths(selectedRowKeys)
    }

    return (
        <>
            {contextHolder}
            <AppPageTitle>Sql Files</AppPageTitle>
            {appAlert}
            <TemplateControl
                isChecked={selectedFilePaths && selectedFilePaths.length > 0}
                isValidated={isValidated}
                selectedFileLength={selectedFilePaths?.length}
                onDelete={onDelete}
                onEdit={onEdit}
            />
            <Table
                rowSelection={{
                    type: 'checkbox',
                    onChange: onChange,
                }}
                columns={columns}
                dataSource={files}
            />
        </>
    );
}

export default PatchingOutputFilePage;