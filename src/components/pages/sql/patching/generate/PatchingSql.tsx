import { useEffect, useState } from 'react';
import { Card, Input, } from 'antd';
import type { PatchingComponentProps } from '../../../../util/interface/pages';

const { TextArea } = Input;

const PatchingSql: React.FC<PatchingComponentProps> = ({ state, setState}) => {

    const [sql, setSql] = useState('');

    useEffect(() => {
        setSql(state.sql);
        setState({ ...state, sql: state.sql })
    }, []);

    return (
        <Card title="SQL" style={{ marginBottom: 16 }}>
            <TextArea
                rows={15}
                defaultValue={sql}
                value={state.sql}
                onChange={e => setState({ ...state, sql: e.target.value.trim() })}
            />
        </Card>
    );
}

export default PatchingSql;