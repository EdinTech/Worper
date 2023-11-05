export const splitFilePath = (filePath: string) => {
    const lastIndex = filePath.lastIndexOf('/');
    if (lastIndex === -1) {
        return {
            path: '',
            fileName: filePath,
        };
    }

    return {
        path: filePath.substring(0, lastIndex + 1),
        fileName: filePath.substring(lastIndex + 1),
    };
}