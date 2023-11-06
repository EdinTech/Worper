import { createBrowserRouter } from 'react-router-dom';
import { path } from './components/util/const/path';
import ErrorPage from './components/pages/error/ErrorPage';
import AppRootLayout from './components/ui/AppRootLayout';
import MainPage from './components/pages/main';
import PatchingGeneratePage from './components/pages/sql/patching/generate';
import PatchingGenerateResultPage from './components/pages/sql/patching/generate-result';
import PatchingTemplatePage from './components/pages/sql/patching/template';
import PatchingTemplateModifyPage from './components/pages/sql/patching/template-modify';
import PatchingOutputFilePage from './components/pages/sql/patching/output-file';
import PatchingOutputFileEditPage from './components/pages/sql/patching/output-file-edit';
import SettingPage from './components/pages/setting';
import TestPage from './components/pages/test';
import SearchingSqlPage from './components/pages/sql/searching/sql';
import SearchingSqlModifyPage from './components/pages/sql/searching/sql-modify';

const routes = [
    { path: path.main, element: <MainPage /> },
    // sql > patching
    { path: path.patchingGenerate, element: <PatchingGeneratePage /> },
    { path: path.patchingGenerateResult, element: <PatchingGenerateResultPage /> },
    { path: path.patchingTemplate, element: <PatchingTemplatePage />},
    { path: path.patchingTemplateModify, element: <PatchingTemplateModifyPage />},
    { path: path.patchingOutputFile, element: <PatchingOutputFilePage />},
    { path: path.patchingOutputFileEdit, element: <PatchingOutputFileEditPage />},
    // sql > searching
    { path: path.searchingSql, element: <SearchingSqlPage/>},
    { path: path.searchingSqlModify, element: <SearchingSqlModifyPage/>},
    // setting
    { path: path.setting, element: <SettingPage />},
    { path: path.test, element: <TestPage />}
];

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppRootLayout />,
        errorElement: <ErrorPage />,
        children: routes
    },
]);

export default router;