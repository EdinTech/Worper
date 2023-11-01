import { useState } from "react";
import { Space } from 'antd';
import PSDefaultPathControl from "./PSDefaultPathControl";
import PSOutputPathControl from "./PSOutputPathControl";
import SettingCard from "../ui/SettingCard";
import { TourProps } from 'antd';

const SettingPatchingSql = () => {

    const [tourOpen, setTourOpen] = useState<boolean>(false);
    return (
        <>
            <SettingCard title="Patching Sql" steps={steps} tourOpen={tourOpen} setTourOpen={setTourOpen} >
                <Space direction="vertical" style={{ width: "100%" }}>
                    <PSDefaultPathControl />
                    <PSOutputPathControl />
                </Space>
            </SettingCard>
        </>
    );
}

export default SettingPatchingSql;

const steps: TourProps['steps'] = [
    {
        title: 'default path',
        description: 'Set the directory path for the workspace, including the configuration file(./setting), generated file(./output) and SQL template file(./templates) storage.',
    },
    {
        title: 'Output path',
        description: 'Set the storage path for the output SQL files. If not set, template files will be saved in a directory named output under the default path.([default path]/output)',
    },
];

