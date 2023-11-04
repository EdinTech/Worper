import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import TemplateModifyBasicInformation from './TemplateModifyBasicInformation';
import TemplateModifyDescription from './TemplateModifyDescription';
import TemplateModifySql from './TemplateModifySql';
import TemplateModifyControl from './TemplateModifyControl';
import TemplateModifyFileInformation from './TemplateModifyFileInformation';
import AppPageTitle from '../../../../ui/AppPageTitle';
import useTemplate from '../../../../util/hooks/useTemplate';
import useMessage from '../../../../util/hooks/useMessage';
import { path } from '../../../../util/const/path';
import { TemplateType, TemplateListType } from '../../../../util/interface/common';
import { PatchingTemplateModifyPageProps } from '../../../../util/interface/pages';

const PatchingTemplateModifyPage: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { value: locationValue, type } = location.state ? location.state : templateListLocationState as PatchingTemplateModifyPageProps;

    const [disabled, setDisabled] = useState(true);
    const [template, setTemplate] = useState<TemplateType>(patchingFileInitialState);
    const [templateListItem, setTemplateListItem] = useState<TemplateListType>(templateListInitialState);
    const { templateManager, templateListManager, templateIndexManager } = useTemplate();
    const { message, contextHolder } = useMessage();

    useEffect(() => {

        if (type !== 'modify') {
            return;
        }

        setTemplateListItem(locationValue);
        templateManager
            .get(locationValue.key)
            .then(setTemplate);
    }, []);

    const onCreate = async () => {
        message.loading("Creating...", 'onCreate');
        if (!templateListItem.templateTitle) {
            message.error("Creating is failed", "onCreate");
            message.error("Template title is required");
            return;
        }
        const { fileName } = await templateManager.create(template);

        const key = dayjs().millisecond().toString();
        const newTemplateListItem = {
            ...templateListItem
            , key: key
            , fileName: fileName
            , createdAt: dayjs().format()
            , updatedAt: dayjs().format()
        };

        await templateIndexManager.add({ [newTemplateListItem.templateTitle]: newTemplateListItem.key });
        await templateListManager.add(key, newTemplateListItem);
        message.success("Template is created", "onCreate");
        setTimeout(() => {
            navigate(path.patchingTemplate);
        }, 500)
    }

    const onUpdate = async () => {
        message.loading("Updating...", "onUpdate")
        const newTemplateListItem = {
            ...templateListItem,
            templateTitle: templateListItem.templateTitle.trim(),
            templateDescription: templateListItem.description.trim(),
            updatedAt: dayjs().format()
        };
        if (!newTemplateListItem.templateTitle) {
            message.error("Updating is failed", "onUpdate");
            message.error("Template title is required");
            return;
        }
        await templateIndexManager.remove(locationValue.templateTitle, "title_index");
        await templateIndexManager.add({ [newTemplateListItem.templateTitle]: newTemplateListItem.key });
        await templateListManager.update(newTemplateListItem.key, newTemplateListItem);
        await templateManager.update(newTemplateListItem.key, template);

        message.success("Template is updated", "onUpdate");
        setTimeout(() => {
            navigate(path.patchingTemplate);
        }, 500)
    }

    const onDelete = async () => {
        message.loading("Deleting...", 'onDelete')
        if (!templateListItem) {
            message.error("Deleting is failed", "onDelete")
            return;
        }
        await templateIndexManager.remove(locationValue.templateTitle, "title_index");
        await templateListManager.remove(templateListItem.key);
        await templateManager.remove(templateListItem.key);
        message.success("Template is deleted", "onDelete");
        setTimeout(() => {
            navigate(path.patchingTemplate);
        }, 500)
    }


    return (
        <>
            {contextHolder}
            <AppPageTitle previousPage='Sql Templates' previousPath={path.patchingTemplate}>
                {type === 'modify' ? 'Modify Template' : 'Create Template'}
            </AppPageTitle>

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
    templateTitle: "",
    description: "",
    fileName: "",
    createdAt: "",
    updatedAt: ""
}

const templateListLocationState: PatchingTemplateModifyPageProps = {
    value: templateListInitialState,
    type: "create"
}