import React from 'react';
import { useTypedDispatch, useTypedSelector } from "../../../../hooks/useRedux";
import { FaDatabase } from "react-icons/fa6";
import DropdownFilter from "../../../../components/DropdownFilter/DropdownFilter";
import Input from "../../../../UI/Input/Input";
import Textarea from "../../../../UI/Input/Textarea";
import { setPlatform, setDbData, setQuery } from "../../slice/tasksSlice";
import "./platform.scss";

const Platform: React.FC = () => {
    const dispatch = useTypedDispatch();
    const platform = useTypedSelector(state => state.tasksSlice.platform);
    const dbData = useTypedSelector(state => state.tasksSlice.dbData);
    const query = useTypedSelector(state => state.tasksSlice.query);

    const handlePlatformChange = (value: string) => {
        dispatch(setPlatform(value));
    };

    const handleDbDataChange = (key: "host" | "user" | "password" | "database", value: string) => {
        dispatch(setDbData({ key, value }));
    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setQuery(e.target.value));
    };

    return (
        <div className="platform">
            <div className="platform__wrapper">
                <DropdownFilter
                    label="Платформа"
                    icon={<FaDatabase />}
                    defaultValue={platform}
                    options={[
                        { label: "JSON", value: "json" },
                        { label: "XML", value: "xml" },
                        { label: "MySQL", value: "mysql" },
                        { label: "PostgreSQL", value: "postgresql" }
                    ]}
                    onChange={handlePlatformChange}
                />

                <Textarea
                    className='platform__query'
                    placeholder="Здесь должны быть ваши данные..."
                    value={query}
                    onChange={handleQueryChange}
                />

                {(platform === "mysql" || platform === "postgresql") && (
                    <div className="platform__connection">
                        <Input
                            placeholder="localhost"
                            value={dbData.host}
                            onChange={(e) => handleDbDataChange("host", e.target.value)}
                        />
                        <Input
                            placeholder="root"
                            value={dbData.user}
                            onChange={(e) => handleDbDataChange("user", e.target.value)}
                        />
                        <Input
                            placeholder="qwerty"
                            value={dbData.password}
                            onChange={(e) => handleDbDataChange("password", e.target.value)}
                        />
                        <Input
                            placeholder="db_name"
                            value={dbData.database}
                            onChange={(e) => handleDbDataChange("database", e.target.value)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Platform;