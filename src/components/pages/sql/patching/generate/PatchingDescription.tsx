import { ChangeEventHandler, useEffect, useState } from 'react';
import { Card, Input, } from 'antd';
import type { PatchingComponentProps } from '../../../../util/interface/pages';

const { TextArea } = Input;

const PatchingDescription: React.FC<PatchingComponentProps> = ({ state, setState}) => {

    const [description, setDescription] = useState('');

    useEffect(() => {
        setDescription(state.description);
        const value = state.description
        const modifiedData = value
                .split('\n')
                .map(line => `--${line}`)
                .join('\n');
        setState({ ...state, description: modifiedData })
    }, []);

    const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const value = e.target.value.trim();
        const modifiedData = value
                .split('\n')
                .map(line => `--${line}`)
                .join('\n');
        setState({ ...state, description: modifiedData })
    }

    return (
        <Card title="Description" style={{ marginBottom: 16 }}>
            <TextArea
                rows={8}
                defaultValue={description}
                onChange={onChangeHandler}
            />
        </Card>
    );
}

export default PatchingDescription;