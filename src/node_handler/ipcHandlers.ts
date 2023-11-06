import { IpcMainInvokeEvent } from 'electron';
import Store from 'electron-store';
import * as fs from 'fs/promises';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IpcHandler = (event: IpcMainInvokeEvent, ...args: any[]) => Promise<any>;

const handleCreateFile: IpcHandler = async (event, filePath: string) => {
    try {
        await fs.writeFile(filePath, '', 'utf-8');
        return true;
    } catch (error) {
        console.error('Error creating file:', error);
        throw error;
    }
}

const handleReadFile: IpcHandler = async (event, filePath: string) => {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
};

const handleWriteFile: IpcHandler = async (event, filePath: string, data: string) => {
    try {
        await fs.writeFile(filePath, data, 'utf-8');
        return true;
    } catch (error) {
        console.error('Error writing file:', error);
        throw error;
    }
};

const handleDeleteFile: IpcHandler = async (event, filePath: string) => {
    try {
        await fs.unlink(filePath);
        return true;
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
};

const handleListFiles: IpcHandler = async (event, dirPath: string) => {
    try {
        const files = await fs.readdir(dirPath);
        return files;
    } catch (error) {
        console.error('Error listing files:', error);
        throw error;
    }
};

const handleExistsDirectory: IpcHandler = async (event, dirPath: string) => {
    try {
        const exists = await fs.stat(dirPath).then(() => true).catch(() => false);
        return exists;
    } catch (error) {
        console.error('Error checking directory:', error);
        throw error;
    }
}

const sendCreateDirectoryRequest: IpcHandler = async (event, dirPath: string) => {
    try {
        await fs.mkdir(dirPath, { recursive: true });
        return true;
    } catch (error) {
        console.error('Error creating directory:', error);
        throw error;
    }
}

const handleStat: IpcHandler = async (event, filePath: string) => {
    try {
        const stat = await fs.stat(filePath);
        return stat;
    } catch (error) {
        console.error('Error getting file stat:', error);
        throw error;
    }
}

const handleRenameFile: IpcHandler = async (event, filePath: string, newFilePath: string) => {
    try {
        await fs.rename(filePath, newFilePath);
        return true;
    } catch (error) {
        console.error('Error renaming file:', error);
        throw error;
    }
}

const store = new Store();
const handleSetStore: IpcHandler = async (event, key: string, value: unknown) => {
    store.set(key, value);
    return true;
}

const handleGetStore: IpcHandler = async (event, key: string) => {
    return store.get(key);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleClearStore: IpcHandler = async (event) => {
    store.clear();
    return true;
}

const handleDeleteStore: IpcHandler = async (event, key: string) => {
    store.delete(key);
    return true;
}

export const handlers = {
    'create-file': handleCreateFile,
    'read-file': handleReadFile,
    'write-file': handleWriteFile,
    'delete-file': handleDeleteFile,
    'list-files': handleListFiles,
    'exists-directory': handleExistsDirectory,
    'create-directory': sendCreateDirectoryRequest,
    'stat': handleStat,
    'rename-file': handleRenameFile,
    'set-store': handleSetStore,
    'get-store': handleGetStore,
    'clear-store': handleClearStore,
    'delete-store': handleDeleteStore
};