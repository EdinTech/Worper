import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

const App: React.FC = () => {
    const [open, setOpen] = useState(false);


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open drawer
            </Button>
            <Drawer title="Multi-level drawer" width={520} closable={false} onClose={onClose} open={open}>

            </Drawer>
        </>
    );
};

export default App;