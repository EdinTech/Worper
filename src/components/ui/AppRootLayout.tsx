import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppLayout from './AppLayout';
import useServiceAccessHistory from '../util/hooks/useServiceAccessHistory';
import { path } from '../util/const/path';

const requiredPathsForLogs = [
    path.patchingGenerate,
    path.patchingTemplate,
    path.patchingOutputFile,
    path.searchingSql,
]

const AppRootLayout: React.FC = () => {

    const location = useLocation();
    const { history } = useServiceAccessHistory();

    if (requiredPathsForLogs.includes(location.pathname)) {
        history.log();
    }

    return (
        <AppLayout>
                {/* outlet component */}
                <Outlet />
        </AppLayout>
    );
};

export default AppRootLayout;
