import { useEffect, useState } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import SearchingSqlModifyContent from './SearchingSqlModifyContent';
import SearchingSqlModifyControl from './SearchingSqlModifyControl';
import useMessage from '../../../../util/hooks/useMessage';
import useSetting from '../../../../util/hooks/useSetting';
import useFileSystem from '../../../../util/hooks/useFileSystem';
import AppPageTitle from '../../../../ui/AppPageTitle';
import { path } from '../../../../util/const/path';

const SearchingSqlModifyPage: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { payload, mode } = location.state;

    const [filePath, setFilePath] = useState("");
    const [fileName, setFileName] = useState("");
    const [originFileName, setOriginFileName] = useState("");
    const [fileContent, setFileContent] = useState("");
    const [disabled, setDisabled] = useState(false);

    const { fs } = useFileSystem()
    const { message, contextHolder } = useMessage();
    const { setting } = useSetting();

    useEffect(() => {

        if (mode === 'create' || !payload) {
            return;
        }

        setFilePath(payload);
        setFileName(payload.split('/').pop());
        setOriginFileName(payload.split('/').pop());
        fs.readFile(payload).then(setFileContent);
    }, []);

    const onCreate = async () => {
        message.loading("Creating...", 'onCreate');

        // check file name
        if (!fileName) {
            message.error("Creating is failed", "onCreate");
            message.error("File's name is required");
            return;
        }

        // create file
        const path = await setting.getSqlDirectoryPath();
        const result = await fs.writeFile(`${path}/${fileName}`, fileContent);
        if (!result) {
            message.error("Creating is failed", "onCreate");
            message.error("File is not created");
            return;
        }
        message.success("Template is created", "onCreate");

        // redirect to searching Sql page
        redirect(navigate);
    }

    const onUpdate = async () => {
        message.loading("Updating...", "onUpdate")

        // check file name
        if (!fileName) {
            message.error("Updating is failed", "onUpdate");
            message.error("File's name is required");
            return;
        }

        // update file
        const result = await fs.writeFile(filePath, fileContent);
        if (!result) {
            message.error("Updating is failed", "onUpdate");
            message.error("File is not updated");
            return;
        }

        // rename file if changed file name
        if(originFileName !== fileName) {
            const path = await setting.getSqlDirectoryPath();
            await fs.rename(filePath, `${path}/${fileName}`);
        }
        message.success("File is updated", "onUpdate");

        // redirect to searching Sql page
        redirect(navigate);
    }

    return (
        <>
            {contextHolder}
            <AppPageTitle previousPage='Sql File' previousPath={path.searchingSql}>
                {mode === 'edit' ? 'Edit Sql file' : 'Create Sql file'}
            </AppPageTitle>

            {/* sql component */}
            <SearchingSqlModifyContent
                originFileName={originFileName}
                fileName={fileName}
                setFileName={setFileName}
                fileContent={fileContent}
                setFileContent={setFileContent}
                setDisabled={setDisabled}
            />

            {/* button component */}
            <SearchingSqlModifyControl
                onCreate={onCreate}
                onUpdate={onUpdate}
                disabled={disabled}
                mode={mode}
            />
        </>
    )
}

export default SearchingSqlModifyPage;

const redirect = (navigate: NavigateFunction) => {
    setTimeout(() => {
        navigate(path.searchingSql);
    }, 500)
}