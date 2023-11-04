import React, { useEffect, useState } from 'react';
import { Form, AutoComplete } from 'antd';
import { TemplateModifyControl } from '../../../../../util/interface/pages';
import usePatchingSetting from '../../../../../util/hooks/usePatchingSetting';

const PBInputActionControl: React.FC<TemplateModifyControl> = ({ template, onChangeState }) => {

    const { getSetting } = usePatchingSetting();

    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [keyword, setKeyword] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [actions, setActions] = useState<string[]>();

    useEffect(() => {

        (async () => {
            const setting = await getSetting();
            setActions(setting.action);
        })();

    }, []);

    useEffect(() => {
        setValue(template.action);
    }, [template]);

    useEffect(() => {

        onChangeState({ type: "action", value: keyword });

        if (!keyword || !actions || actions.length === 0) {
            return;
        }

        const timer = setTimeout(() => {
            const filteredActions = actions.filter(action => action.includes(keyword));
            setOptions(filteredActions.map(action => ({ value: action })));
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [keyword]);

    const handleChange = (value: string) => {
        setValue(value);
        onChangeState({ type: "action", value });
    }

    const onChange = (data: string) => {
        setValue(data);
    };

    return (
        <>
            <Form.Item label="Action">
                <AutoComplete
                    options={options}
                    style={{ width: "100%" }}
                    value={value}
                    onSelect={handleChange}
                    onSearch={setKeyword}
                    onChange={onChange}
                    placeholder="input Action"
                />
            </Form.Item>
        </>
    );
}

export default PBInputActionControl;