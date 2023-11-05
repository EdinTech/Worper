import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Drawer, Typography } from 'antd';
import useMessage from '../../../../util/hooks/useMessage';
import dayjs from "dayjs";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";
import SearchingSqlButton from './ui/TemplateButton';
import useTemplate from '../../../../util/hooks/useTemplate';
import { TemplateListType, TemplateType } from '../../../../util/interface/common';


export interface TemplateDrawerProps {
    open: boolean;
    onClose: () => void;
    payload: TemplateListType
}

const { Text } = Typography;

const TemplateDrawer: React.FC<TemplateDrawerProps> = ({ open, onClose, payload }) => {

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

    return (
        <>
            {contextHolder}
            <Drawer
                title={<Text style={{ fontSize: 21 }}>{payload?.templateTitle}</Text>}
                width={600}
                closable={true}
                onClose={onClose}
                open={open}
            >
                <Descriptions
                    column={1}
                    size='small'
                    layout="vertical"
                    items={[
                        { key: 1, label: "output file name", children: getTemplateOutputFileName(template)},
                    ]}
                />
                <SearchingSqlButton onCopy={() => onCopy(template.sql)} />
                <pre>
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

const getTemplateOutputFileName = (template: TemplateType) => {
    return `00_${dayjs().format("YYYYMMDD")}${template.applier}_${dayjs().format("YYYYMMDD")}${template.applier}_${template.tableName}_${template.action}`;
}

const getTemplateOutputFileContent = (template: TemplateType) => {
    // description
    const modifiedDescription = template.description
    .split('\n')
    .map(line => `--${line}`)
    .join('\n');

    // description + sql
    return modifiedDescription + '\n\n' + template.sql;
}