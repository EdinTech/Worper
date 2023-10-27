import { message } from 'antd';

const useMessage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = (message: string, key?: string | null) => {
        messageApi.open({
            key: key ?? 'success',
            type: 'success',
            content: message,
        });
    };

    const error = (message: string, key?: string | null) => {
        messageApi.open({
            key: key ?? 'error',
            type: 'error',
            content: message,
        });
    };

    const warning = (message: string, key?: string | null) => {
        messageApi.open({
            key: key ?? 'warning',
            type: 'warning',
            content: message,
        });
    };

    const loading = (message?: string | null, key?: string | null) => {
        messageApi.open({
            key: key ?? 'loading',
            type: 'loading',
            content: message || 'Loading...',
        });
    }

    return { message: {success, error, warning, loading}, contextHolder };
}

export default useMessage;
