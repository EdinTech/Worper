import React, { useEffect, useState } from 'react';
import { Form, AutoComplete } from 'antd';
import { TemplateModifyControl } from '../../../../../util/interface/pages';
import usePatchingSetting from '../../../../../util/hooks/usePatchingSetting';

const PBInputTableControl: React.FC<TemplateModifyControl> = ({ template, onChangeState }) => {

    const { getSetting } = usePatchingSetting();

    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [keyword, setKeyword] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [tableKeyPair, setTableKeyPair] = useState<{[val: string]: string}>();

    useEffect(() => {

        (async () => {
            const setting = await getSetting();
            setTableKeyPair(setting.table_name);
        })();

    }, []);

    useEffect(() => {
        setValue(template.tableName);
    }, [template]);

    useEffect(() => {

        onChangeState({ type: "tableName", value: keyword });

        if (!keyword || !tableKeyPair || Object.keys(tableKeyPair).length === 0) {
            return;
        }


        const timer = setTimeout(() => {
            const tableList = Object.keys(tableKeyPair).filter(key => key.includes(keyword));
            setOptions(tableList.map(key => ({ value: tableKeyPair[key] })));
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [keyword]);

    const handleChange = (value: string) => {
        setValue(value);
        onChangeState({ type: "tableName", value });
    }

    const onChange = (data: string) => {
        setValue(data);
    };

    return (
        <>
            <Form.Item label="Table Name">
                <AutoComplete
                    options={options}
                    style={{ width: "100%" }}
                    value={value}
                    onSelect={handleChange}
                    onSearch={setKeyword}
                    onChange={onChange}
                    placeholder="input Table Name"
                />
            </Form.Item>
        </>
    );
}

export default PBInputTableControl;