import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Descriptions, Drawer, Typography } from 'antd';
import Prism from "prismjs";
import { path } from '../../../../util/const/path';
import useMessage from '../../../../util/hooks/useMessage';
import useTemplate from '../../../../util/hooks/useTemplate';
import { TemplateType, TemplateDrawerProps } from '../../../../util/interface/common';
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";

const { Text } = Typography;

const TemplateDrawer: React.FC<TemplateDrawerProps> = ({ open, onClose, payload }) => {

    const navigate = useNavigate();
    const [template, setTemplate] = useState<TemplateType>(patchingFileInitialState);
    const { message, contextHolder } = useMessage();
    const { templateManager } = useTemplate();

    useEffect(() => {
        if (!payload) {
            return;
        }
        templateManager
            .get(payload.key)
            .then(setTemplate);

        setTimeout(() => {
            Prism.highlightAll();
        }, 100)
    }, [payload]);

    const onCopy = (value: string) => {
        if (!template) {
            return;
        }
        navigator.clipboard.writeText(value)
        message.success("Sql copied!")
    }

    const onUseTemplate = () => {
        navigate(path.patchingGenerate, { state: { templateKey: payload?.key }})
    }

    return (
        <>
            {contextHolder}
            <Drawer
                title={<Text style={{ fontSize: 21 }}>{payload?.templateTitle}</Text>}
                width={600}
                closable={true}
                onClose={onClose}
                open={open}
                extra={(<Button onClick={onUseTemplate}>Use this Template</Button>)}
            >
                <Descriptions
                    column={2}
                    size='small'
                    items={[
                        { key: 1, label: "applicant", children: template.applier },
                        { key: 2, label: "checker", children: template.checker },
                        { key: 4, label: "table name", children: template.tableName },
                        { key: 5, label: "action", children: template.action },
                    ]}
                />
                <pre onClick={onCopy.bind(null, template.sql)} style={{ cursor: "pointer" }}>
                    <code className="language-sql">
                        {getTemplateOutputFileContent(template)}
                    </code>
                </pre>
            </Drawer>
        </>
    );
};

export default TemplateDrawer;

const patchingFileInitialState: TemplateType = {
    applier: '',
    checker: '',
    tableName: '',
    action: '',
    sql: '',
    description: '',
    extension: 'sql',
};

const getTemplateOutputFileContent = (template: TemplateType) => {
    // description
    const modifiedDescription = template.description
    .split('\n')
    .map(line => `--${line}`)
    .join('\n');

    // description + sql
    return modifiedDescription + '\n\n' + template.sql;
}