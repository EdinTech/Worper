// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from 'electron';
import * as preloadHandlers from './node_handler/preloadHandlers';

type ElectronAPI = {
    sendReadFileRequest: typeof preloadHandlers.sendReadFileRequest;
    sendWriteFileRequest: typeof preloadHandlers.sendWriteFileRequest;
    sendDeleteFileRequest: typeof preloadHandlers.sendDeleteFileRequest;
    sendListFilesRequest: typeof preloadHandlers.sendListFilesRequest;
};

contextBridge.exposeInMainWorld('electron', preloadHandlers as ElectronAPI);