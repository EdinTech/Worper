import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import { RouterProvider } from 'react-router-dom';
import router from './router';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
            <RouterProvider router={router} />
        </ConfigProvider>
    </>
);