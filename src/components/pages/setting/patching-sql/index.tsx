import { useState } from "react";
import { Space } from 'antd';
import PSTemplatePathControl from "./PSTemplatePathControl";
import PSDefaultPathControl from "./PSDefaultPathControl";
import PSOutputPathControl from "./PSOutputPathControl";
import SettingCard from "../ui/SettingCard";
import type { TourProps } from 'antd';

const SettingPatchingSql = () => {

    const [tourOpen, setTourOpen] = useState<boolean>(false);
    return (
        <>
            <SettingCard title="Patching Sql" steps={steps} tourOpen={tourOpen} setTourOpen={setTourOpen} >
                <Space direction="vertical" style={{ width: "100%" }}>
                    <PSDefaultPathControl />
                    <PSTemplatePathControl />
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
        description: 'Set the default path for the workspace, including the configuration file(./setting), generated file(./output) and SQL template file(./templates) storage.',
    },
    {
        title: 'Template path',
        description: 'Set the storage path for the SQL template files. If not set, template files will be saved in a directory named templates under the default path.([default path]/templates)',
    },
    {
        title: 'Output path',
        description: 'Set the storage path for the output SQL files. If not set, template files will be saved in a directory named output under the default path.([default path]/output)',
    },
];

