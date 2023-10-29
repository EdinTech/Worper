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
import useServiceAccessHistory from '../../../../util/hooks/useServiceAccessHistory';

const columns: ColumnsType<TemplateListType> = [
    {
        title: 'Template',
        dataIndex: 'template',
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        render: (text: string) => dayjs(text).format('YYYY-MM-DD')
    }
];

const PatchingTemplatePage: React.FC = () => {

    useServiceAccessHistory({log: true});

    const [templates, setTemplates] = useState<TemplateListType[]>();
    const [templateListItem, setTemplateListItem] = useState<TemplateListType>();
    const { templateListManager, templateIndexManager, templateManager } = useTemplate();
    const {isValidated, appAlert } = useValidateSetting();
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        templateListManager.get().then(setTemplates);
    }, []);

    const onChange = (_: React.Key[], selectedRows: TemplateListType[]) => {
        setIsChecked(true);
        setTemplateListItem(selectedRows[0]);
    }

    const onCreate = () => {
        navigate(path.patchingTemplateModify, {
            state: {
                templateListItem: null,
                type: 'create'
            }
        });
        setIsChecked(false);
    }

    const onDelete = () => {
        if (!templateListItem) {
            return;
        }
        templateListManager.remove(templateListItem.key);
        templateIndexManager.remove(templateListItem.template);
        templateManager.remove(templateListItem.file);
        const filteredTemplates = templates?.filter(template => template.key != templateListItem.key);
        setTemplates(filteredTemplates)
        setIsChecked(false);
    }

    const onEdit = () => {
        if (!templateListItem) {
            return;
        }
        navigate(path.patchingTemplateModify, {
            state: {
                templateListItem: templateListItem,
                type: 'modify'
            }
        });
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
            <Table
                rowSelection={{
                    type: 'radio',
                    onChange: onChange,
                }}
                columns={columns}
                dataSource={templates}
            />
        </>
    )
}

export default PatchingTemplatePage;