import { Form, Input } from "antd";

const OutputFileSearchInput: React.FC<{ onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ onChange }) => {

    return (
        <Form.Item>
            <Input
                autoFocus
                placeholder="Search Output File"
                required={true}
                onChange={onChange}
            />
        </Form.Item>
    )
}

export default OutputFileSearchInput;