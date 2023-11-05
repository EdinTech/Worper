import { Button, Space } from "antd";
import { SearchingSqlModifyControlProps } from "../../../../util/interface/pages";

const SearchingSqlModifyControl: React.FC<SearchingSqlModifyControlProps> = ({ onCreate, onUpdate, mode, disabled }) => {
    return (
        <>
            <div style={{ textAlign: "right" }}>
                <Space>
                    {mode === "create" && <Button type="primary" shape="round" size={'large'} onClick={onCreate} disabled={disabled}>Create</Button>}
                    {mode === "update" && <Button type="primary" shape="round" size={'large'} onClick={onUpdate} disabled={disabled}>Update</Button>}
                </Space>
            </div>
        </>
    );
}

export default SearchingSqlModifyControl;