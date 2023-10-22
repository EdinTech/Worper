import React, { useState } from 'react';
import { Button } from 'antd';

const ThrowError: React.FC<{ error: unknown }> = ({ error }) => {
    const [errorMessage, setErrorMessage] = useState<Error>(error as Error);
    const onClick = () => {
        setErrorMessage(errorMessage);
    };

    if (error) {
        throw error;
    }
    return (
        <Button danger onClick={onClick}>
            Click me to throw a error
        </Button>
    );
};

export default ThrowError;