import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../../util/const/path';
import useValidateSetting from '../../../../util/hooks/useValidateSetting';
import useFileSystem from '../../../../util/hooks/useFileSystem';
import useMessage from '../../../../util/hooks/useMessage';
import OutputFileControl from './SearchingSqlControl';
import useSetting from '../../../../util/hooks/useSetting';
import OutputFileSearchInput from './SearchingSqlSearchInput';
import AppPageTitle from '../../../../ui/AppPageTitle';
import type { ColumnsType } from 'antd/es/table';
import SearchingSqlDrawer from './SearchingSqlDrawer';

const SearchingSqlPage: React.FC = () => {

    const navigate = useNavigate();
    const [files, setFiles] = useState<ColumnsType>();
    const [filteredFiles, setFilteredFiles] = useState<ColumnsType>();
    const [selectedFilePaths, setSelectedFilePaths] = useState<string[]>();
    const [currentRecord, setCurrentRecord] = useState<{ key: string, file: string }>();
    const [open, setOpen] = useState(false);
    const { isValidated, appAlert } = useValidateSetting();
    const { setting } = useSetting();
    const { message, contextHolder } = useMessage();
    const { fs } = useFileSystem();

    useEffect(() => {
        (async () => {
            const path = await setting.getSqlDirectoryPath();
            if (!path) {
                return;
            }
            const files = await fs.readdir(path);
            const fileKeyFilePairs = files.map(file => ({ key: `${path}/${file}`, file }));
            setFiles(fileKeyFilePairs);
            setFilteredFiles(fileKeyFilePairs);
        })();
    }, []);

    const onCreate = () => {
        navigate(path.searchingSqlModify, {
            state: {
                payload: null,
                mode: 'create'
            }
        });
    }

    const onDelete = () => {
        selectedFilePaths.forEach(filePath => {
            setFiles(prevState => (prevState?.filter(file => file.key !== filePath)));
            setFilteredFiles(prevState => (prevState?.filter(file => file.key !== filePath)));
            fs.unlink(filePath);
        });
        message.success("deleted!");
    }

    const onUpdate = () => {
        navigate(path.searchingSqlModify, {
            state: {
                payload: selectedFilePaths[0],
                mode: 'update'
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

    const onHandleDrawer = (record: { key: string, file: string }) => {
        setCurrentRecord(record);
        setOpen(true)
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
                onCreate={onCreate}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
            <OutputFileSearchInput onChange={onSearch} />
            <Table
                rowSelection={{
                    type: 'checkbox',
                    onChange: onChange,
                }}
                columns={getColumn(onHandleDrawer)}
                dataSource={filteredFiles}
            />
            <SearchingSqlDrawer
                record={currentRecord}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}

export default SearchingSqlPage;

const getColumn = (onHandleDrawer: (record: unknown) => void) => {
    return [
        {
            title: 'File',
            dataIndex: 'file',
            render: (text, record) => <a onClick={() => onHandleDrawer(record)}>{text}</a>,
        }
    ] as ColumnsType
}

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
        const newList = list.filter((v: { key: string, file: string }) => v.file.includes(keyword))
        callback(newList);
    }, 300);
}