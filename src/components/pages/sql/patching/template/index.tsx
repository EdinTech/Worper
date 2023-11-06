import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Table } from 'antd';
import AppPageTitle from '../../../../ui/AppPageTitle';
import TemplateControl from './TemplateControl';
import TemplateSearchInput from './TemplateSearchInput';
import useTemplate from '../../../../util/hooks/useTemplate';
import useValidateSetting from '../../../../util/hooks/useValidateSetting';
import { path } from '../../../../util/const/path';
import type { ColumnsType } from 'antd/es/table';
import type { TemplateListType } from '../../../../util/interface/common';
import TemplateDrawer from './TemplateDrawer';

const PatchingTemplatePage: React.FC = () => {

    const [templateItems, setTemplateItems] = useState<TemplateListType[]>();
    const [filteredTemplates, setFilteredTemplate] = useState<TemplateListType[]>();
    const [templateItem, setTemplateItem] = useState<TemplateListType>();
    const { templateListManager, templateIndexManager, templateManager } = useTemplate();
    const [currentRecord, setCurrentRecord] = useState<TemplateListType>();
    const [open, setOpen] = useState(false);

    const { isValidated, appAlert } = useValidateSetting();
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const list = await templateListManager.get();
            if (!list) {
                return;
            }
            const lists = Object.values(list);
            setTemplateItems(lists);
            setFilteredTemplate(lists);
        })();
    }, []);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value;
        searchByKeyword(keyword, templateItems, setFilteredTemplate);
    }

    const onChange = (_: React.Key[], selectedRows: TemplateListType[]) => {
        setIsChecked(true);
        setTemplateItem(selectedRows[0]);
    }

    const onCreate = () => {
        navigate(path.patchingTemplateModify, {
            state: { payload: null, mode: 'create' }
        });
        setIsChecked(false);
    }

    const onEdit = () => {
        navigate(path.patchingTemplateModify, {
            state: { payload: templateItem, mode: 'update' }
        });
        setIsChecked(false);
    }

    const onDelete = () => {
        const keyToDelete = templateItem.key;
        templateManager.remove(keyToDelete);
        templateListManager.remove(keyToDelete);
        templateIndexManager.remove(templateItem.templateTitle, "title_index");
        setTemplateItems(prevState => (prevState.filter(v => v.key != keyToDelete)));
        setFilteredTemplate(prevState => (prevState.filter(v => v.key != keyToDelete)));
        setIsChecked(false);
    }
    const onHandleDrawer = (record: TemplateListType) => {
        setCurrentRecord(record);
        setOpen(true)
    }
    return (
        <>
            <AppPageTitle>Sql Templates</AppPageTitle>
            {appAlert}
            <TemplateControl
                isChecked={isChecked}
                onCreate={onCreate}
                onEdit={onEdit}
                onDelete={onDelete}
                isValidated={isValidated}
            />
            <TemplateSearchInput onChange={onSearch} />
            <Table
                rowSelection={{
                    type: 'radio',
                    onChange: onChange,
                }}
                columns={getColumn(onHandleDrawer)}
                dataSource={filteredTemplates}
            />
            <TemplateDrawer
                payload={currentRecord}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    )
}

export default PatchingTemplatePage;

const getColumn = (onHandleDrawer: (record: unknown) => void) => {
    return [
        {
            title: 'Template',
            dataIndex: 'templateTitle',
            render: (text, record) => <a onClick={() => onHandleDrawer(record)}>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: 'Created At',
            dataIndex: 'updatedAt',
            render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
        }
    ] as ColumnsType<TemplateListType>;
}

let timeout: ReturnType<typeof setTimeout> | null;

const searchByKeyword = (keyword: string, list: TemplateListType[], callback: React.Dispatch<React.SetStateAction<TemplateListType[]>>) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    if (!keyword) {
        callback(list);
        return;
    }

    timeout = setTimeout(() => {
        const newList = list.filter(v => v.templateTitle.includes(keyword))
        callback(newList);
    }, 300);
}