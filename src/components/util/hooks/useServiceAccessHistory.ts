// hooks/useElectronStore.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { serviceInformations } from '../const/service';

export interface History {
    [key: string]: string;
}

const key = 'serviceAccessHistory';

function useServiceAccessHistory(payload?: { log: boolean} | null) {
    const location = useLocation();
    useEffect(() => {
        if (payload?.log) {
            setStoreHistoryByPath();
        }
    }, []);

    const setStoreHistoryByPath =async () => {
        const path = location.pathname;
        const currentService = serviceInformations.filter(information => information.path === path)[0];
        if (!currentService) {
            return;
        }
        const storedHistory = await window.electron.sendGetStoreRequest(key);
        if (!storedHistory) {
            const newHistory = { [currentService.title]: new Date().toISOString() }
            await window.electron.sendSetStoreRequest(key, JSON.stringify(newHistory));
            return;
        }
        const history = JSON.parse(storedHistory as string);

        const newHistory = { ...history, [currentService.title]: new Date().toISOString() }
        await window.electron.sendSetStoreRequest(key, JSON.stringify(newHistory));
    }

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

    return { history, getStoreHistoryOrderBy, setStoreHistoryByPath } as const;
}

export default useServiceAccessHistory;