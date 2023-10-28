// hooks/useElectronStore.ts
import { useState, useEffect } from 'react';

export interface History {
    [key: string]: string;
}

function useServiceAccessHistory() {
    const [history, setHistory] = useState<History>(null);
    const key = 'serviceAccessHistory';
    useEffect(() => {
        (async () => {
            const storedHistory = await window.electron.sendGetStoreRequest(key);
            if (storedHistory !== undefined) {
                const history = JSON.parse(storedHistory as string);
                setHistory(history);
            }
        })();
    }, []);

    const setStoreHistory = async (serviceName: string) => {
        if (!serviceName) return;
        const newHistory = { ...history, [serviceName]: new Date().toISOString() };
        await window.electron.sendSetStoreRequest(key, JSON.stringify(newHistory));
        setHistory(newHistory);
    };

    const getStoreHistoryOrderBy = async (limit: number) => {

        const storedHistory = await window.electron.sendGetStoreRequest(key);
        if (!storedHistory) {
            return [];
        }
        const historyObj = JSON.parse(storedHistory as string);
        const historyArray = Object.entries(historyObj) as Array<[string, string]>;
        historyArray.sort((a, b) => (b[1]).localeCompare(a[1]));
        const fetchCount = limit ?? 20;
        return historyArray.slice(0, fetchCount);
    }

    return { history, setStoreHistory, getStoreHistoryOrderBy } as const;
}

export default useServiceAccessHistory;