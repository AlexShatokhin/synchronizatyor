import React from 'react';
import { useTypedSelector } from '../../hooks/useRedux';
import Button from "../../UI/Button/Button";
import { FaPlus } from "react-icons/fa";
import "./tasks.scss";
import TaskAccordions from "./components/TaskAccordions/TaskAccordions";
import useHttp from '../../hooks/useHttp';

const Tasks: React.FC = () => {
    const {
        platform,
        query,
        dbData,
        mappingType,
        mapping,
        planning: { mode: planningMode, selectedDays, time }
    } = useTypedSelector(state => state.tasksSlice);
    const email = useTypedSelector(state => state.userData.email);

    const { fetchData } = useHttp();

    const handleSyncClick = () => {
        const syncData = {
            host: dbData.host,
            user: dbData.user,
            password: dbData.password,
            database: dbData.database,
            mapping: {
                type: mappingType,
                data: mapping
            },
            cron: handleGenerateCron(),
            query,
            email,
            data: query
        };
        console.log("Sync Data:", syncData);
        fetchData(`http://localhost:4000/api/${platform}`, "POST", JSON.stringify(syncData))
        .then(res => console.log(res))
        .catch(err => console.error(err));
    };

    const generateCronExpression = (days: string[], time: string): string => {
        const dayMap: { [key: string]: number } = {
            'Каждый понедельник': 1,
            'Каждый вторник': 2,
            'Каждую среду': 3,
            'Каждый четверг': 4,
            'Каждую пятницу': 5,
            'Каждую субботу': 6,
            'Каждое воскресенье': 0,
        };

        const [hour, minute] = time.split(':').map(Number);
        const dayOfWeek = days.map(day => dayMap[day]).join(',');

        return `${minute} ${hour} * * ${dayOfWeek}`;
    };

    const handleGenerateCron = () => {
        if (planningMode === 'recurring' && selectedDays.length > 0 && time)
            return generateCronExpression(selectedDays, time)
        else 
            return null;

    };

    return (
        <section className="tasks page-module">
            <h1 className="page-title tasks__title">Синхронизация</h1>
            <Button title={
                <div className="button-add">
                    <FaPlus />
                    <span>Синхронизировать</span>
                </div>
            } onClick={handleSyncClick} />
            <TaskAccordions />
            <Button title={"Синхронизировать"} onClick={handleSyncClick} />
        </section>
    );
};

export default Tasks;