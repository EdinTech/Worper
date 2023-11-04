import { useLocation } from 'react-router-dom';
import { serviceInformations } from '../const/service';
import useStore from './useStore';

const key = 'serviceAccessHistory';

const defaultLimit = 20;

function useServiceAccessHistory() {
    const location = useLocation();
    const { store } = useStore();

    const createServiceAccessHistory = () => {
        const log =async () => {
            const path = location.pathname;
            const currentService = serviceInformations.find(information => information.path === path);
            if (!currentService) {
                return;
            }
            const history = await store.get(key);
            if (!history) {
                const newHistory = { [currentService.title]: new Date().toISOString() }
                store.set(key, newHistory);
                return;
            }

            const newHistory = { ...history, [currentService.title]: new Date().toISOString() }
            store.set(key, newHistory);
        }

        const get = async (limit: number) => {
            const history = await store.get(key);
            if (!history) {
                return [];
            }
            const historyArray = Object.entries(history) as Array<[string, string]>;
            return historyArray
                .sort((a, b) => (b[1]).localeCompare(a[1]))
                .slice(0, limit ?? defaultLimit);
        }

        return { log, get } as const;
    }

    const history = createServiceAccessHistory();

    return { history } as const;
}

export default useServiceAccessHistory;