import React from 'react';
import { useTypedSelector } from '../../hooks/useRedux';
import Button from "../../UI/Button/Button";
import { FaPlus } from "react-icons/fa";
import "./tasks.scss";
import TaskAccordions from "./components/TaskAccordions/TaskAccordions";
import useHttp from '../../hooks/useHttp';

const Tasks: React.FC = () => {
    const platform = useTypedSelector(state => state.tasksSlice.platform);
    const query = useTypedSelector(state => state.tasksSlice.query);
    const dbData = useTypedSelector(state => state.tasksSlice.dbData);
    const mappingType = useTypedSelector(state => state.tasksSlice.mappingType);
    const mapping = useTypedSelector(state => state.tasksSlice.mapping);
    const email = useTypedSelector(state => state.userData.email); // Предполагаем, что email хранится в userSlice

    const { fetchData } = useHttp();

    const handleSyncClick = () => {
        const syncData = {
            host: dbData.host,
            user: dbData.user,
            password: dbData.password,
            database: dbData.database,
            query,
            email,
            data: query
        };
        console.log("Sync Data:", syncData);
        fetchData(`http://localhost:4000/api/${platform}`, "POST", JSON.stringify(syncData));
        // Здесь вы можете отправить syncData на сервер или выполнить другие действия
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