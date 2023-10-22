export interface MenuItem {
    key: React.Key;
    icon?: React.ReactNode;
    children?: MenuItem[];
    label: React.ReactNode;
}

export type GetItemFunction = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
) => MenuItem;

export interface AppAlertProps {
    messages: [string, string][];
    showIcon?: boolean;
    closable?: boolean;
    type: 'success' | 'info' | 'warning' | 'error';
    action?: React.ReactNode;
}