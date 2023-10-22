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

        return { createFile, writeFile, readFile, unlink, readdir, start, mkdir }
    }

    const fs = createFileSystem();

    return { fs, isLoading, error };
}


export default useFileSystem;