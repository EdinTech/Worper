import React, { useEffect, useState } from 'react';
import { Drawer, Typography } from 'antd';
import useFileSystem from '../../../../util/hooks/useFileSystem';
import useMessage from '../../../../util/hooks/useMessage';
import dayjs from "dayjs";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";
import SearchingSqlButton from './ui/SearchingSqlButton';


export interface SearchingSqlDrawerProps {
    open: boolean;
    onClose: () => void;
    record: { key: string, file: string }
}

const { Text } = Typography;

const SearchingSqlDrawer: React.FC<SearchingSqlDrawerProps> = ({ open, onClose, record }) => {

    const { fs } = useFileSystem();
    const [stat, setStat] = useState({
        size: 0,
        mtime: "",
        ctime: "",
    });
    const [sqlCode, setSqlCode] = useState('');
    const { message, contextHolder } = useMessage();

    useEffect(() => {
        if (!record) {
            return;
        }
        fs.stat(record.key).then(setStat);
        fs.readFile(record.key).then(setSqlCode);
        setTimeout(() => {
            Prism.highlightAll();
        }, 100)
    }, [record]);

    const onCopy = () => {
        navigator.clipboard.writeText(sqlCode)
        message.success("Sql copied!")
    }

    return (
        <>
            {contextHolder}
            <Drawer
                title={<Text style={{ fontSize: 21 }}>{record?.file}</Text>}
                width={600}
                closable={true}
                onClose={onClose}
                open={open}
            >
                <Text type='secondary' style={{ fontSize: 12 }}>
                    updated at: {dayjs(stat?.mtime).format('YYYY-MM-DD HH:mm:ss')}
                </Text>
                <SearchingSqlButton onCopy={onCopy} />
                <pre>
                    <code className="language-sql">{sqlCode}</code>
                </pre>
            </Drawer>
        </>
    );
};

export default SearchingSqlDrawer;