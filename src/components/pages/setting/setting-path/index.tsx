import { useState } from "react";
import { Space, TourProps } from 'antd';
import SettingPathOutputControl from "./SettingPathOutputControl";
import SettingPathWorkspaceControl from "./SettingPathWorkspaceControl";
import SettingCard from "../ui/SettingCard";

const SettingPath: React.FC= () => {

    const [tourOpen, setTourOpen] = useState<boolean>(false);
    return (
        <>
            <SettingCard title="Path" steps={steps} tourOpen={tourOpen} setTourOpen={setTourOpen} >
                <Space direction="vertical" style={{ width: "100%" }}>

                    <SettingPathWorkspaceControl />

                    <SettingPathOutputControl />
                </Space>
            </SettingCard>
        </>
    );
}

export default SettingPath;

const steps: TourProps['steps'] = [
    {
        title: 'workspace path',
        description: 'Set the directory path for the workspace, including the configuration file(./setting), generated file(./output), SQL file from searching (./sql) and SQL template file for patching(./templates) storage.',
    },
    {
        title: 'Output path',
        description: 'Set the storage path for the output SQL files. If not set, template files will be saved in a directory named output under the default path.([w path]/output)',
    },
];

