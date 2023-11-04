import { Form, Input } from "antd";

const TemplateSearchInput: React.FC<{ onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ onChange }) => {

    return (
        <Form.Item>
            <Input
                autoFocus
                placeholder="Search Templates"
                required={true}
                onChange={onChange}
            />
        </Form.Item>
    )
}

export default TemplateSearchInput;