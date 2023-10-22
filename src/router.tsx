import { createBrowserRouter } from 'react-router-dom';
import AppRootLayout from './components/ui/AppRootLayout';
import MainPage from './components/pages/main';
import PatchingGeneratePage from './components/pages/sql/patching/generate';
import PatchingSettingPage from './components/pages/sql/patching/setting';
import SettingPage from './components/pages/setting';
import ErrorPage from './components/pages/error/404';
import { path } from './components/util/const/path';
import PatchingGenerateResultPage from './components/pages/sql/patching/generate-result';
import PatchingTemplateEditPage from './components/pages/sql/patching/generate-template-edit';
import PatchingTemplatePage from './components/pages/sql/patching/generate-template';

const routes = [
    { path: path.main, element: <PatchingTemplatePage /> },
    { path: path.patchingGenerate, element: <PatchingGeneratePage /> },
    { path: path.patchingGenerateResult, element: <PatchingGenerateResultPage /> },
    { path: path.patchingTemplate, element: <PatchingTemplatePage />},
    { path: path.patchingTemplateEdit, element: <PatchingTemplateEditPage />},
    { path: path.patchingSetting, element: <PatchingSettingPage />},
    { path: path.setting, element: <SettingPage />},
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