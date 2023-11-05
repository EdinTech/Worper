import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import AppPageTitle from '../../../../ui/AppPageTitle';
import FileContent from './FileContent';
import FileEditControl from './FileEditControl';
import useMessage from '../../../../util/hooks/useMessage';
import useFileSystem from '../../../../util/hooks/useFileSystem';
import { path } from '../../../../util/const/path';
import type { FileStateType } from "../../../../util/interface/pages";

const OutputFileEditPage: React.FC = () => {

    const location = useLocation();
    const [fileState, setFileState] = useState(fileInitialState);
    const [disabled, setDisabled] = useState(true);
    const { message, contextHolder } = useMessage();
    const { fs } = useFileSystem();

    const { filePath } = location.state;

    useEffect(() => {
        (async () => {
            const stat = await fs.stat(filePath);
            const content = await fs.readFile(filePath);
            const fileName = filePath.split('/').pop();
            const path = filePath.replace(fileName, '');
            setFileState({
                atime: dayjs(stat.atime).format('YYYY-MM-DD HH:mm:ss'),
                mtime: dayjs(stat.mtime).format('YYYY-MM-DD HH:mm:ss'),
                ctime: dayjs(stat.ctime).format('YYYY-MM-DD HH:mm:ss'),
                birthtime: dayjs(stat.birthtime).format('YYYY-MM-DD HH:mm:ss'),
                size: stat.size,
                path: path,
                name: fileName,
                content: content,
                originName: fileName,
                isChanged: false,
            });
        })()
    }, []);

    const onUpdate = async () => {
        message.loading("loading...", "onUpdate");
        const result = fs.writeFile(filePath, fileState.content);
        if (!result) {
            message.error("File is not updated", "onUpdate");
            return;
        }
        if(fileState.originName !== fileState.name) {
            await fs.rename(filePath, fileState.path + fileState.name);
        }
        message.success("File is updated", "onUpdate");
    }

    return (
        <>
            {contextHolder}
            <AppPageTitle previousPage='Sql Files' previousPath={path.patchingOutputFile}>File Edit</AppPageTitle>

            <FileContent
                fileState={fileState}
                setFileState={setFileState}
                setDisabled={setDisabled}
            />

            <FileEditControl
                disabled={disabled || !fileState.isChanged}
                onUpdate={onUpdate}
            />
        </>
    );
}

export default OutputFileEditPage;

const fileInitialState: FileStateType = {
    atime: '',
    mtime: '',
    ctime: '',
    birthtime: '',
    size: '',
    path: '',
    name: '',
    content: '',
    originName: '',
    isChanged: false,
}