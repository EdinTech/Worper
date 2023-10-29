import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import PatchingTemplate from './PatchingTemplate';
import PatchingBasicInformation from './PatchingBasicInformation';
import PatchingSql from './PatchingSql';
import PatchingControl from './PatchingControl';
import PatchingDescription from './PatchingDescription';
import PatchingFileInfo, { getFileName } from './PatchingFileInfo';
import AppPageTitle from '../../../../ui/AppPageTitle';
import AppAlert from '../../../../ui/AppAlert';
import useServiceAccessHistory from '../../../../util/hooks/useServiceAccessHistory';
import useElectronStore from '../../../../util/hooks/useElectronStore';
import useFileSystem from '../../../../util/hooks/useFileSystem';
import { path } from '../../../../util/const/path';
import { PATCHING } from '../../../../util/const/setting';
import { NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE } from '../../../../util/const/message';
import type { PatchingFile, } from '../../../../util/interface/pages';

const patchingFileInitialState: PatchingFile = {
    id: 0,
    applyingDate: dayjs().format('YYYYMMDD'),
    applier: '',
    checkingDate: dayjs().format('YYYYMMDD'),
    checker: '',
    tableName: '',
    action: '',
    sql: '',
    description: '',
    extension: 'sql',
};

const PatchingGeneratePage: React.FC = () => {

    useServiceAccessHistory({log: true});
    const [state, setState] = useState<PatchingFile>(patchingFileInitialState);
    const [outputPath, setOutputPath] = useState(null);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const { electronStore } = useElectronStore();
    const { fs, isLoading, error } = useFileSystem();

    useEffect(() => {
        (async () => {

            // Get template directory path and Set
            const templatePath = await electronStore.get(PATCHING.TEMPLATE_DIRECTORY_PATH_KEY);
            if (!templatePath) {
                setMessages([[NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE.title,
                NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE.description]]);
                return;
            }

            // Get output default path and Set
            let outputPath: string;
            const defaultOutputPath = await electronStore.get(PATCHING.DEFAULT_OUTPUT_DIRECTORY_PATH_KEY);
            if (!defaultOutputPath) {
                setMessages([NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE.title,
                NOT_FOUND_WORKSPACE_PATH_KEY_MESSAGE.description]);
                return;
            }
            outputPath = defaultOutputPath as string;

            // If exists custom output path, then get and set.
            const customOutputPath = await electronStore.get(PATCHING.OUTPUT_DIRECTORY_PATH_KEY);
            if (customOutputPath) {
                outputPath = customOutputPath as string;
            }
            setOutputPath(outputPath);
        }
        )();
    }, []);

    const onGenerateHandler = async () => {
        const { fullFileName, fullFilePath } = await getFullPath();

        // description
        const modifiedDescription = state.description
                .split('\n')
                .map(line => `--${line}`)
                .join('\n');

        // description + sql
        const content = modifiedDescription + '\n\n' + state.sql

        // create file
        const result = await fs.writeFile(fullFilePath, content);
        if (result) {
            navigate(path.patchingGenerateResult, {
                state: {
                    status: "success",
                    title: "File saved successfully.",
                    returnPath: path.patchingGenerate,
                    fileName: fullFileName,
                    filePath: outputPath,
                }
            })
        } else {
            navigate(path.patchingGenerateResult, {
                state: {
                    status: "error",
                    title: "Failed to save the file.",
                    returnPath: path.patchingGenerate,
                    error: error,
                }
            })
        }
    }

    const getFullPath = async () => {

        let count = 0;

        // file_name
        const fileName = getFileName(state);

        // file_name.extension
        let fullFileName = fileName + '.' + state.extension;

        // file_path/file_name.extension
        let fullFilePath = outputPath + '/' + fullFileName;

        // check file exists
        let existsFile = await fs.start(fullFilePath);

        while (existsFile) {

            // file_name[count].extension
            fullFileName = fileName + `(${count}).` + state.extension;

            // file_path/file_name[count].extension
            fullFilePath = outputPath + '/' + fullFileName;

            existsFile = await fs.start(fullFilePath);

            count++;
        }
        return {
            fullFileName, fullFilePath
        };
    }

    return (
        <>
            <AppPageTitle>Generate Sql File</AppPageTitle>

            {/* alert component */}
            <AppAlert
                messages={messages}
                type="warning"
                closable={true}
                showIcon={true}
                action={<Link to={path.setting}>go setting</Link>}
            />

            {/* template component */}
            <PatchingTemplate setState={setState} />

            {/* basic Information component */}
            <PatchingBasicInformation state={state} setState={setState} />

            {/* description of sql component */}
            <PatchingDescription state={state} setState={setState} />

            {/* sql component */}
            <PatchingSql state={state} setState={setState} />

            {/* download file information component */}
            <PatchingFileInfo outputPath={outputPath} state={state} />

            {/* control component */}
            <PatchingControl onGenerate={onGenerateHandler} isLoading={isLoading} disabled={!outputPath} />
        </>
    );
}

export default PatchingGeneratePage;