declare global {
    interface Window {
        electron: ElectronAPI;
    }
}

export interface ElectronAPI {
    sendCreateFileRequest(filePath: string): Promise<boolean>;
    sendReadFileRequest(filePath: string): Promise<string>;
    sendWriteFileRequest(filePath: string, data: string): Promise<boolean>;
    sendDeleteFileRequest(filePath: string): Promise<boolean>;
    sendListFilesRequest(directoryPath: string): Promise<string[]>;
    sendExistsDirectoryRequest(directoryPath: string): Promise<boolean>;
    sendCreateDirectoryRequest(directoryPath: string): Promise<boolean>;
    sendSetStoreRequest(key: string, value: T): Promise<boolean>;
    sendGetStoreRequest(key: string): Promise<T>;
    sendClearStoreRequest(): Promise<boolean>;
    sendDeleteStoreRequest(key: string): Promise<boolean>;
}
