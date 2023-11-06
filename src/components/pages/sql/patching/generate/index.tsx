import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import PatchingTemplate from './PatchingTemplate';
import PatchingBasicInformation from './PatchingBasicInformation';
import PatchingSql from './PatchingSql';
import PatchingControl from './PatchingControl';
import PatchingDescription from './PatchingDescription';
import PatchingFileInfo, { getFileName } from './PatchingFileInfo';
import AppPageTitle from '../../../../ui/AppPageTitle';
import useFileSystem from '../../../../util/hooks/useFileSystem';
import useValidateSetting from '../../../../util/hooks/useValidateSetting';
import useSetting from '../../../../util/hooks/useSetting';
import useTemplate from '../../../../util/hooks/useTemplate';
import { path } from '../../../../util/const/path';
import { PatchingFile, } from '../../../../util/interface/pages';

const PatchingGeneratePage: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [outputPath, setOutputPath] = useState(null);
    const [state, setState] = useState<PatchingFile>(patchingFileInitialState);
    const { setting } = useSetting();
    const { appAlert } = useValidateSetting();
    const { fs, isLoading, error } = useFileSystem();
    const { templateManager } = useTemplate();


    useEffect(() => {
        setting.getCurrentOutputDirectoryPath()
            .then(path => path && setOutputPath(path));

        if (!location.state) {
            return;
        }

        (async () => {
            const template = await templateManager.get(location.state.templateKey);
            template && setState(prevState => {
                return {
                    ...prevState,
                    ...template,
                } as PatchingFile;
            });
        })();

    }, []);

    const onGenerate = async () => {
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
            {appAlert}

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
            <PatchingControl isLoading={isLoading} disabled={!outputPath} onGenerate={onGenerate} />
        </>
    );
}

export default PatchingGeneratePage;

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