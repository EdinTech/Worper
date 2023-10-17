import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './pages/main/_index';
import { ConfigProvider,  } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
            <MainPage />
        </ConfigProvider>
    </React.StrictMode>
);