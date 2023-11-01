import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Result, Alert } from 'antd';
import ThrowError from './ThrowError';
import GenerateResultSuccessSubTitle from './GenerateResultSuccessSubTitle';
import { path } from '../../../../util/const/path';
import { PatchingGenerateResultPage } from '../../../../util/interface/pages';

const { ErrorBoundary } = Alert;

const PatchingGenerateResultPage: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { status, title, returnPath, error, filePath, fileName } = location.state as PatchingGenerateResultPage;

    if (status === 'success') {
        return (<>
            <Result
                status={status}
                title={title}
                subTitle={<GenerateResultSuccessSubTitle fileName={fileName} filePath={filePath} />}
                extra={[
                    <Button
                        type="primary"
                        key="console"
                        onClick={() => navigate(path.main_window)}
                    >
                        Go Dashboard
                    </Button>,
                    <Button
                        key="return"
                        onClick={() => navigate(returnPath)}
                    >
                        Go Back
                    </Button>,
                ]}
            />
        </>)
    }
    return (<>
        <Result
            status={status}
            title={title}
            subTitle={<ErrorBoundary><ThrowError error={error} /></ErrorBoundary>}
            extra={[
                <Button
                    type="primary"
                    key="dashboard"
                    onClick={() => navigate(path.main_window)}
                >
                    Go Dashboard
                </Button>,
                <Button
                    key="return"
                    onClick={() => navigate(returnPath)}
                >
                    Go Back
                </Button>,
            ]}
        />
    </>)
};

export default PatchingGenerateResultPage;