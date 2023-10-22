// hooks/useElectronStore.ts
function useElectronStore<T>() {

  const createStore = () => {
    const get = async (key: string) => {
      return await window.electron.sendGetStoreRequest(key);
    }

    const set = async (key: string, newValue: T) => {
      return await window.electron.sendSetStoreRequest(key, newValue);
    };

    const del = async (key: string) => {
      return await window.electron.sendDeleteStoreRequest(key);
    };

    return {get, set, delete: del} as const;
  }

  const electronStore = createStore();

  return { electronStore } as const;
}

export default useElectronStore;
