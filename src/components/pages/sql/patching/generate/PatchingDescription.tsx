import { Card, Input, } from 'antd';
import { PatchingComponentProps } from '../../../../util/interface/pages';

const { TextArea } = Input;

const PatchingDescription: React.FC<PatchingComponentProps> = ({ state, setState}) => {

    return (
        <Card title="Description" style={{ marginBottom: 16 }}>
            <TextArea
                rows={8}
                value={state.description}
                onChange={(e)=>setState({ ...state, description: e.target.value })}
            />
        </Card>
    );
}

export default PatchingDescription;