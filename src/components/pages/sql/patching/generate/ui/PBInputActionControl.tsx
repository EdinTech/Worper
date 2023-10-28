import React, { useEffect, useState } from 'react';
import { Form, AutoComplete } from 'antd';
import { PBControl } from '../../../../../util/interface/pages';
import usePatchingSetting from '../../../../../util/hooks/usePatchingSetting';

const PBInputActionControl: React.FC<PBControl> = ({ state, onChangeState }) => {

    const { useSetting } = usePatchingSetting();

    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [keyword, setKeyword] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [actions, setActions] = useState<string[]>();

    useEffect(() => {

        (async () => {
            const setting = await useSetting();
            if (!setting) {
                return;
            }
            setActions(setting.action);
        })();

    }, []);

    useEffect(() => {
        setValue(state.action);
    }, [state]);

    useEffect(() => {

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
    }, [value]);

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