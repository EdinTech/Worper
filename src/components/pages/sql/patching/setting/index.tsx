import { useEffect, useState } from "react";

const PatchingSettingPage = () => {

    const [fileContent, setFileContent] = useState('');

    useEffect(() => {
        async function fetchFileContent() {
            try {
                const content = await window.electron.sendReadFileRequest('/home/kimbaeksub/src/temp/test.json');
                setFileContent(content);
            } catch (error) {
                console.error('Error fetching file content:', error);
            }
        }

        fetchFileContent();
    }, []);

    return (
        <>
            <pre>{fileContent}</pre>
        </>
    )
}

export default PatchingSettingPage;