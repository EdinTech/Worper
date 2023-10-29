import { Card, Input, } from 'antd';
import type { TemplateModifyFormProps } from '../../../../util/interface/pages';

const { TextArea } = Input;

const TemplateModifyDescription: React.FC<TemplateModifyFormProps> = ({ template, setTemplate }) => {

    return (
        <Card title="Description" style={{ marginBottom: 16 }}>
            <TextArea
                rows={8}
                value={template.description}
                onChange={(e)=>setTemplate({ ...template, description: e.target.value })}
            />
        </Card>
    );
}

export default TemplateModifyDescription;