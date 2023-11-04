import AppPageTitle from '../../../../ui/AppPageTitle';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Table } from 'antd';
import TemplateControl from './TemplateControl';
import useTemplate from '../../../../util/hooks/useTemplate';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../../util/const/path';
import type { ColumnsType } from 'antd/es/table';
import type { TemplateListType } from '../../../../util/interface/common';
import useValidateSetting from '../../../../util/hooks/useValidateSetting';
import TemplateSearchInput from './TemplateSearchInput';

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

const PatchingTemplatePage: React.FC = () => {

    const [templateItems, setTemplateItems] = useState<TemplateListType[]>();
    const [filteredTemplates, setFilteredTemplate] = useState<TemplateListType[]>();
    const [templateItem, setTemplateItem] = useState<TemplateListType>();
    const { templateListManager, templateIndexManager, templateManager } = useTemplate();
    const { isValidated, appAlert } = useValidateSetting();
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const list = await templateListManager.get();
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
            state: { value: null, type: 'create' }
        });
        setIsChecked(false);
    }

    const onEdit = () => {
        navigate(path.patchingTemplateModify, {
            state: { value: templateItem, type: 'modify' }
        });
        setIsChecked(false);
    }

    const onDelete = () => {
        templateListManager.remove(templateItem.key);
        templateIndexManager.remove(templateItem.key, "title_index");
        templateManager.remove(templateItem.key);
        const filteredTemplates = templateItems?.filter(v => v.key != templateItem.key);
        setTemplateItems(filteredTemplates)
        setIsChecked(false);
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
                columns={columns}
                dataSource={filteredTemplates}
            />
        </>
    )
}

export default PatchingTemplatePage;

const columns: ColumnsType<TemplateListType> = [
    {
        title: 'Template',
        dataIndex: 'templateTitle',
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        render: (text: string) => dayjs(text).format('YYYY-MM-DD')
    },
    {
        title: 'Created At',
        dataIndex: 'updatedAt',
        render: (text: string) => dayjs(text).format('YYYY-MM-DD')
    }
];