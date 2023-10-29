import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import TemplateModifyBasicInformation from './TemplateModifyBasicInformation';
import TemplateModifyDescription from './TemplateModifyDescription';
import TemplateModifySql from './TemplateModifySql';
import TemplateModifyControl from './TemplateModifyControl';
import TemplateModifyFileInformation from './TemplateModifyFileInformation';
import AppPageTitle from '../../../../ui/AppPageTitle';
import useServiceAccessHistory from '../../../../util/hooks/useServiceAccessHistory';
import useTemplate from '../../../../util/hooks/useTemplate';
import useMessage from '../../../../util/hooks/useMessage';
import { path } from '../../../../util/const/path';
import type { TemplateType, TemplateListType } from '../../../../util/interface/common';
import type { PatchingTemplateModifyPageProps } from '../../../../util/interface/pages';

const patchingFileInitialState: TemplateType = {
    applier: '',
    checker: '',
    tableName: '',
    action: '',
    sql: '',
    description: '',
    extension: 'sql',
};

const templateListInitialState: TemplateListType = {
    key: "",
    template: "",
    description: "",
    file: "",
    createdAt: ""
}

const templateListLocationState: PatchingTemplateModifyPageProps = {
    templateListItem: templateListInitialState,
    type: "create"
}

const PatchingTemplateModifyPage: React.FC = () => {

    useServiceAccessHistory({log: true});

    const navigate = useNavigate();
    const location = useLocation();
    const { templateListItem: locatedTemplateListItem, type } = location.state ? location.state : templateListLocationState as PatchingTemplateModifyPageProps;

    const [disabled, setDisabled] = useState(true);
    const [template, setTemplate] = useState<TemplateType>(patchingFileInitialState);
    const [templateListItem, setTemplateListItem] = useState<TemplateListType>(templateListInitialState);
    const { templateManager, templateListManager, templateIndexManager } = useTemplate();
    const { message, contextHolder } = useMessage();

    const pageTitle = type === 'modify' ? 'Modify Template' : 'Create Template';
    useEffect(() => {

        if (type !== 'modify') {
            return;
        }
        setTemplateListItem(locatedTemplateListItem);

        (async () => {
            setTemplate(await templateManager.get(locatedTemplateListItem.file));
        })();
    }, []);

    const onCreate = async () => {
        message.loading("Creating...", 'onCreate');
        if (!templateListItem.template) {
            message.error("Creating is failed", "onCreate");
            message.error("Template title is required");
            return;
        }
        const { fileName } = await templateManager.create(template);
        const templateItemToCreate = {
            ...templateListItem
            , key: dayjs().millisecond().toString()
            , file: fileName
            , createdAt: dayjs().format()
        };

        templateListManager.add(templateItemToCreate);
        templateIndexManager.add({ [templateItemToCreate.template]: templateItemToCreate.file });
        message.success("Template is created", "onCreate");
        setTimeout(() => {
            navigate(path.patchingTemplateModify, {
                state: {
                    templateListItem: templateItemToCreate,
                    type: 'modify'
                }
            });
        }, 1000)
    }

    const onUpdate = async () => {
        message.loading("Updating...", "onUpdate")
        if (!templateListItem.template) {
            message.error("Updating is failed", "onUpdate");
            message.error("Template title is required");
            return;
        }
        templateListManager.update(templateListItem);
        templateIndexManager.remove(templateListItem.template);
        templateIndexManager.add({ [templateListItem.template]: templateListItem.file });
        templateManager.update(templateListItem.file, template);

        message.success("Template is updated", "onUpdate");
    }

    const onDelete = async () => {
        message.loading("Deleting...", 'onDelete')
        if (!templateListItem) {
            message.error("Deleting is failed", "onDelete")
            return;
        }
        templateListManager.remove(templateListItem.key);
        templateIndexManager.remove(templateListItem.template);
        templateManager.remove(templateListItem.file);
        message.success("Template is deleted", "onDelete");
        setTimeout(() => {
            navigate(path.patchingTemplate);
        }, 1000)
    }


    return (
        <>
            {contextHolder}
            <AppPageTitle previousPage='Sql Templates' previousPath={path.patchingTemplate}>{pageTitle}</AppPageTitle>

            {/* file Information component */}
            <TemplateModifyFileInformation templateListItem={templateListItem} setTemplateListItem={setTemplateListItem} setDisabled={setDisabled} />

            {/* basic Information component */}
            <TemplateModifyBasicInformation template={template} setTemplate={setTemplate} />

            {/* description of sql component */}
            <TemplateModifyDescription template={template} setTemplate={setTemplate} />

            {/* sql component */}
            <TemplateModifySql template={template} setTemplate={setTemplate} />

            {/* button component */}
            <TemplateModifyControl onCreate={onCreate} onUpdate={onUpdate} onDelete={onDelete} type={type} disabled={disabled} />
        </>
    )
}

export default PatchingTemplateModifyPage;