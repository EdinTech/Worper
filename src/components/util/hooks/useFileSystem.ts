import { useState } from "react";

const useFileSystem = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createFileSystem = () => {

        const createFile = async (filePath: string) => {
            setIsLoading(true);
            try {
                return await window.electron.sendCreateFileRequest(filePath);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        const readFile = async (filePath: string) => {
            setIsLoading(true);
            try {
                return await window.electron.sendReadFileRequest(filePath);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        const writeFile = async (filePath: string, data: string) => {
            setIsLoading(true);
            try {
                return await window.electron.sendWriteFileRequest(filePath, data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        const unlink = async (filePath: string) => {
            setIsLoading(true);
            try {
                return await window.electron.sendDeleteFileRequest(filePath);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        const readdir = async (dirPath: string) => {
            setIsLoading(true);
            try {
                return await window.electron.sendListFilesRequest(dirPath);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        const start = async (dirPath: string) => {
            setIsLoading(true);
            try {
                return await window.electron.sendExistsDirectoryRequest(dirPath);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        const mkdir = async (dirPath: string) => {
            setIsLoading(true);
            try {
                return await window.electron.sendCreateDirectoryRequest(dirPath);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        const stat = async (filePath: string) => {
            setIsLoading(true);
            try {
                return await window.electron.sendStatRequest(filePath);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        const rename = async (filePath: string, newFilePath: string) => {
            setIsLoading(true);
            try {
                return await window.electron.sendRenameFileRequest(filePath, newFilePath);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        const createDirectoryIfNotExists = async (directoryPath: string) => {
            if (await start(directoryPath)) {
                return true;
            }
            return await mkdir(directoryPath);
        }

        const createFileIfNotExists = async (filePath: string, content: object) => {
            if (await start(filePath)) {
                return true;
            }
            await writeFile(filePath, JSON.stringify(content, null, 2));
        }

        return { createFile, writeFile, readFile, unlink, readdir, start, mkdir, stat, rename, createDirectoryIfNotExists, createFileIfNotExists }
    }

    const fs = createFileSystem();

    return { fs, isLoading, error };
}


export default useFileSystem;