import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Space, Select, SelectProps } from 'antd';
import useMessage from '../../../../util/hooks/useMessage';
import useTemplate from '../../../../util/hooks/useTemplate';
import { path } from '../../../../util/const/path';
import type { PatchingTemplateProps, TemplateIndex } from '../../../../util/interface/pages';

const PatchingTemplate: React.FC<PatchingTemplateProps> = ({ setState }) => {

    const [data, setData] = useState<SelectProps['options']>([]);
    const [templateIndex, setTemplateIndex] = useState<TemplateIndex>();
    const [value, setValue] = useState<string>();
    const [enteredValue, setEnteredValue] = useState<string>();
    const { message, contextHolder } = useMessage()
    const { templateIndexManager, templateManager } = useTemplate();

    // First, get template index.
    useEffect(() => {

        templateIndexManager
            .get()
            .then(setTemplateIndex);

    }, []);

    // Search template by keyword.
    useEffect(() => {

        const searchData = setTimeout(() => {

            if (!enteredValue || !templateIndex || Object.keys(templateIndex.template_title_index).length === 0) {
                return;
            }

            const templateItemSet: SelectProps['options'] = [];

            const titleIndex = templateIndex.template_title_index;
            Object.keys(titleIndex).forEach(title => {
                if (title.includes(enteredValue)) {
                    templateItemSet.push({
                        label: title,
                        value: title
                    })
                }
            });

            setData(templateItemSet);

        }, 300);

        return () => {
            clearTimeout(searchData);
            setData([]);
        }
    }, [enteredValue]);

    const handleChange = async (templateTitle: string) => {

        setValue(templateTitle);

        const result = await templateManager.search(templateTitle);
        if (!result.exists) {

            templateIndexManager.remove(templateTitle)
            setTemplateIndex(preState => {
                const index = { ...preState };
                delete index.template_title_index[templateTitle];
                return { ...index };
            });

            setValue("");
            setData([]);

            message.error('Template not found.');
            return;
        }

        const template = result.data;
        setState(preState => {
            return {
                ...preState,
                ...template
            }
        });
    }

    return <>
        {contextHolder}
        <Card title="SQL Template" style={{ marginBottom: 16 }}>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Select
                    showSearch
                    value={value}
                    placeholder='Please search sql Template'
                    style={{ width: '100%' }}
                    defaultActiveFirstOption={false}
                    suffixIcon={null}
                    filterOption={false}
                    onSearch={setEnteredValue}
                    onChange={handleChange}
                    notFoundContent={null}
                    options={(data || []).map((d) => ({
                        value: d.value,
                        label: d.label,
                    }))}
                />
                <Space>
                    Create or edit templates <Link to={path.patchingTemplate}>Click here.</Link>
                </Space>
            </Space>
        </Card>
    </>
}

export default PatchingTemplate;