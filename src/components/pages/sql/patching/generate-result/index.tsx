import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Result, Alert } from 'antd';
import ThrowError from './ThrowError';
import PGSuccessSubTitle from './PGSuccessSubTitle';
import type { PatchingGenerateResultPage } from '../../../../util/interface/pages';

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
                subTitle={<PGSuccessSubTitle fileName={fileName} filePath={filePath} />}
                extra={[
                    <Button type="primary" key="console">
                        Go Dashboard
                    </Button>,
                    <Button onClick={() => navigate(returnPath)}>Go Back</Button>,
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
                <Button type="primary" key="console">
                    Go Dashboard
                </Button>,
                <Button onClick={() => navigate(returnPath)}>Go Back</Button>,
            ]}
        />
    </>)
};

export default PatchingGenerateResultPage;