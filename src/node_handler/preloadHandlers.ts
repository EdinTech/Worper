import { ipcRenderer } from 'electron';

/**
 * send create file request
 * @param filePath
 * @returns Promise<boolean>
 */
export function sendCreateFileRequest(filePath: string): Promise<boolean> {
    return ipcRenderer.invoke('create-file', filePath);
}

/**
 * send read file request
 * @param filePath
 * @returns Promise<string>
 */
export function sendReadFileRequest(filePath: string): Promise<string> {
    return ipcRenderer.invoke('read-file', filePath);
}

/**
 * send write file request
 * @param filePath
 * @param data
 * @returns Promise<boolean>
 */
export function sendWriteFileRequest(filePath: string, data: string): Promise<boolean> {
    return ipcRenderer.invoke('write-file', filePath, data);
}

/**
 * send delete file request
 * @param filePath
 * @returns Promise<boolean>
 */
export function sendDeleteFileRequest(filePath: string): Promise<boolean> {
    return ipcRenderer.invoke('delete-file', filePath);
}

/**
 * send list files request
 * @returns Promise<string[]>
 */
export function sendListFilesRequest(directoryPath: string): Promise<string[]> {
    return ipcRenderer.invoke('list-files', directoryPath);
}

export function sendExistsDirectoryRequest(directoryPath: string): Promise<boolean> {
    return ipcRenderer.invoke('exists-directory', directoryPath);
}

export function sendCreateDirectoryRequest(directoryPath: string): Promise<boolean> {
    return ipcRenderer.invoke('create-directory', directoryPath);
}

export function sendSetStoreRequest(key: string, value: any): Promise<boolean> {
    return ipcRenderer.invoke('set-store', key, value);
}

export function sendGetStoreRequest(key: string): Promise<Record<string, string>> {
    return ipcRenderer.invoke('get-store', key);
}

export function sendClearStoreRequest(): Promise<boolean> {
    return ipcRenderer.invoke('clear-store');
}

export function sendDeleteStoreRequest(key: string): Promise<boolean> {
    return ipcRenderer.invoke('delete-store', key);
}