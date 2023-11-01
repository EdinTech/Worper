import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import AppPageTitle from '../../../../ui/AppPageTitle';
import FileContent from './FileContent';
import FileEditControl from './FileEditControl';
import useMessage from '../../../../util/hooks/useMessage';
import useFileSystem from '../../../../util/hooks/useFileSystem';
import { path } from '../../../../util/const/path';
import type { FileStateType } from "../../../../util/interface/pages";

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

const splitFilePath = (filePath: string) => {
    const lastIndex = filePath.lastIndexOf('/');
    if (lastIndex === -1) {
        return {
            path: '',
            fileName: filePath,
        };
    }

    return {
        path: filePath.substring(0, lastIndex + 1),
        fileName: filePath.substring(lastIndex + 1),
    };
}

const OutputFileEditPage: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [fileState, setFileState] = useState(fileInitialState);
    const [disabled, setDisabled] = useState(true);
    const { message, contextHolder } = useMessage();
    const { fs } = useFileSystem();

    const { filePath } = location.state;

    useEffect(() => {
        (async () => {
            const stat = await fs.stat(filePath);
            const {path, fileName} = splitFilePath(filePath);
            const content = await fs.readFile(filePath);
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
        try {
            await fs.writeFile(filePath, fileState.content);
            if(fileState.originName !== fileState.name) {
                await fs.rename(filePath, fileState.path + fileState.name);
            }
            message.success("File is updated", "onUpdate");
        } catch (e) {
            message.error("File is not updated", "onUpdate");
        }
    }

    const onCancel = () => {
        navigate(path.patchingOutputFile);
    }

    return (
        <>
            {contextHolder}
            <AppPageTitle previousPage='Sql Files' previousPath={path.patchingOutputFile}>File Edit</AppPageTitle>

            <FileContent fileState={fileState} setFileState={setFileState} setDisabled={setDisabled} />

            <FileEditControl onUpdate={onUpdate} onCancel={onCancel} disabled={disabled || !fileState.isChanged}/>
        </>
    );
}

export default OutputFileEditPage;