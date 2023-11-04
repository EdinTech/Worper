import { ipcRenderer } from 'electron';
import type { Stats } from 'fs';

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

/**
 * send exists directory request
 * @param directoryPath
 * @returns Promise<boolean>
 */
export function sendExistsDirectoryRequest(directoryPath: string): Promise<boolean> {
    return ipcRenderer.invoke('exists-directory', directoryPath);
}

/**
 * send create directory request
 * @param directoryPath
 * @returns Promise<boolean>
 */
export function sendCreateDirectoryRequest(directoryPath: string): Promise<boolean> {
    return ipcRenderer.invoke('create-directory', directoryPath);
}

/**
 * send stat request
 * @param filePath
 * @returns Promise<Stats>
 */
export function sendStatRequest(filePath: string): Promise<Stats> {
    return ipcRenderer.invoke('stat', filePath);
}

/**
 * send rename file request
 * @param filePath
 * @param newFilePath
 * @returns Promise<boolean>
 */
export function sendRenameFileRequest(filePath: string, newFilePath: string): Promise<boolean> {
    return ipcRenderer.invoke('rename-file', filePath, newFilePath);
}

/**
 * send set store request
 * @param key
 * @param value
 * @returns Promise<boolean>
 */
export function sendSetStoreRequest(key: string, value: any): Promise<boolean> {
    return ipcRenderer.invoke('set-store', key, value);
}

/**
 * send get store request
 * @param key
 * @returns Promise<Record<string, string>>
 */
export function sendGetStoreRequest(key: string): Promise<Record<string, string>> {
    return ipcRenderer.invoke('get-store', key);
}

/**
 * send clear store request
 * @returns Promise<boolean>
 */
export function sendClearStoreRequest(): Promise<boolean> {
    return ipcRenderer.invoke('clear-store');
}

/**
 * send delete store request
 * @param key
 * @returns
 */
export function sendDeleteStoreRequest(key: string): Promise<boolean> {
    return ipcRenderer.invoke('delete-store', key);
}