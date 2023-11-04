// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from 'electron';
import * as preloadHandlers from './node_handler/preloadHandlers';
// eslint-disable-next-line import/no-unresolved
import { ElectronAPI } from './types/global';

contextBridge.exposeInMainWorld('electron', preloadHandlers as ElectronAPI);