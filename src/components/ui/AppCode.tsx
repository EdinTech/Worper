import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-solarizedlight.css";

const AppCode: React.FC<{ children: React.ReactNode, language: string }> = ({ children, language }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div className="Code">
            <pre>
                <code className={`language-${language}`}>{children}</code>
            </pre>
        </div>
    );
}

export default AppCode;

