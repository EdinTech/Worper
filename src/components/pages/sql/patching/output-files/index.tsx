import AppPageTitle from '../../../../ui/AppPageTitle';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Table } from 'antd';
import useTemplate from '../../../../util/hooks/useTemplate';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../../util/const/path';
import type { ColumnsType } from 'antd/es/table';
import type { TemplateListType } from '../../../../util/interface/common';
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


const PatchingOutputFilesPage = () => {

    useServiceAccessHistory({log: true});

    const {isValidated, appAlert } = useValidateSetting();
    const { electronStore } = useElectronStore();
    const { message, contextHolder } = useMessage();

    const { fs } = useFileSystem();
    const [ files, setFiles ] = useState<ColumnsType>();
    const [selectedFilePaths, setSelectedFilePaths] = useState<string[]>();

    useEffect(()=> {
        (async () => {
            const outputPath = await electronStore.get(PATCHING.DEFAULT_OUTPUT_DIRECTORY_PATH_KEY)
            if (outputPath) {
                return;
            }
            const files = await fs.readdir(outputPath);
            const outputFiles = files.map(file => {
                return {
                    key: `${outputPath}/${file}`,
                    file
                }
            });
            setFiles(outputFiles);
            console.log(outputFiles);
        })();
    }, []);

    const onChecked = (selectedRowKeys: string[]) => {
        setSelectedFilePaths(selectedRowKeys)
        console.log(selectedRowKeys)
    }

    const onDelete = () => {
        selectedFilePaths.forEach
        console.log("onDeleted")
    }
    return (
        <>
            {contextHolder}
            <AppPageTitle>Sql Templates</AppPageTitle>
            {appAlert}
            <TemplateControl isChecked={selectedFilePaths.length > 0} isValidated={isValidated} onDelete={onDelete} />
            <Table
                rowSelection={{
                    type: 'checkbox',
                    onChange: onChecked,
                }}
                columns={columns}
                dataSource={files}
            />
        </>
    );
}

export default PatchingOutputFilesPage;