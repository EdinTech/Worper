import AppPageTitle from '../../../../ui/AppPageTitle';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../../util/const/path';
import type { ColumnsType } from 'antd/es/table';
import useValidateSetting from '../../../../util/hooks/useValidateSetting';
import useFileSystem from '../../../../util/hooks/useFileSystem';
import useMessage from '../../../../util/hooks/useMessage';
import OutputFileControl from './OutputFileControl';
import useSetting from '../../../../util/hooks/useSetting';
import OutputFileSearchInput from './OutputFileSearchInput';

const PatchingOutputFilePage = () => {

    const navigate = useNavigate();
    const [files, setFiles] = useState<ColumnsType>();
    const [filteredFiles, setFilteredFiles] = useState<ColumnsType>();
    const [selectedFilePaths, setSelectedFilePaths] = useState<string[]>();
    const { isValidated, appAlert } = useValidateSetting();
    const { patchingSetting } = useSetting();
    const { message, contextHolder } = useMessage();
    const { fs } = useFileSystem();

    useEffect(() => {
        (async () => {
            const outputPath = await patchingSetting.getCurrentOutputDirectoryPath();
            if (!outputPath) {
                return;
            }
            const files = await fs.readdir(outputPath);
            const fileKeyFilePairs = files.map(file => ({ key: `${outputPath}/${file}`, file }));
            setFiles(fileKeyFilePairs);
            setFilteredFiles(fileKeyFilePairs);
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

    const onSearch = (value: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = value.target.value;
        searchByKeyword(keyword, files, setFilteredFiles);
    }
    return (
        <>
            {contextHolder}
            <AppPageTitle>Sql Files</AppPageTitle>
            {appAlert}
            <OutputFileControl
                isChecked={selectedFilePaths && selectedFilePaths.length > 0}
                isValidated={isValidated}
                selectedFileLength={selectedFilePaths?.length}
                onDelete={onDelete}
                onEdit={onEdit}
            />
            <OutputFileSearchInput onChange={onSearch} />
            <Table
                rowSelection={{
                    type: 'checkbox',
                    onChange: onChange,
                }}
                columns={columns}
                dataSource={filteredFiles}
            />
        </>
    );
}

export default PatchingOutputFilePage;

const columns: ColumnsType = [
    {
        title: 'File',
        dataIndex: 'file',
    }
];

let timeout: ReturnType<typeof setTimeout> | null;

const searchByKeyword = (keyword: string, list: ColumnsType, callback: React.Dispatch<React.SetStateAction<ColumnsType>>) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    if (!keyword) {
        callback(list);
        return;
    }

    timeout = setTimeout(() => {
        const newList = list.filter((v: { key: string, file:string }) => v.file.includes(keyword))
        callback(newList);
    }, 300);
}