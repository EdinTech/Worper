import { Card, Input, } from 'antd';
import type { TemplateModifyFormProps } from '../../../../util/interface/pages';

const { TextArea } = Input;

const TemplateModifySql: React.FC<TemplateModifyFormProps> = ({ template, setTemplate }) => {

    return (
        <Card title="SQL" style={{ marginBottom: 16 }}>
            <TextArea
                rows={15}
                value={template.sql}
                onChange={e => setTemplate({ ...template, sql: e.target.value })}
            />
        </Card>
    );
}

export default TemplateModifySql;