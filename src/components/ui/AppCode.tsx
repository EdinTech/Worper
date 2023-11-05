import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const AppCode: React.FC<{ children: React.ReactNode, language: string }> = ({ children, language }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <>
            <pre>
                <code className={`language-${language}`}>{children}</code>
            </pre>
        </>
    );
}

export default AppCode;

