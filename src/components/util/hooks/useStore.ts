const useStore = () => {

    const createStore = () => {
        const get = async (key: string, type?: null | "string") => {
            const store = await window.electron.sendGetStoreRequest(key);
            if (!store) {
                return;
            }
            if (type === "string") {
                return store;
            }
            return JSON.parse(store);
        }

        const set = async (key: string, value: object | string, type?: null | "string") => {
            if (type === "string") {
                return await window.electron.sendSetStoreRequest(key, value);
            }
            return await window.electron.sendSetStoreRequest(key, JSON.stringify(value));
        }

        const del = async (key: string) => {
            return await window.electron.sendDeleteStoreRequest(key);
        }

        return { get, set, delete: del }
    }

    const store = createStore();
    return { store };
}

export default useStore;