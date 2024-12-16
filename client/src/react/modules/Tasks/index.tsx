import { useState, useEffect } from "react";
import useHttp from "../../hooks/useHttp";

import Spinner from "../../UI/Spinner/Spinner";
import { colors } from "../../../constants/colors";
import TaskItem from "./components/TaskItem";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const { fetchData, loading } = useHttp();

    const getTasks = () => {
        fetchData(`http://localhost:4000/api/schedule`, "GET")
        .then((response) => {
            console.log("Tasks:", response);
            setTasks(response);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    }

    const renderTasks = () => {
        return tasks.map((task : any, index) => {
            return <TaskItem key={task.id} {...task} />
        });
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <section className="tasks page-module">
            <h1 className="page-title">Запланированные задачи</h1>
            <div className="tasks__content">
                {loading ? <Spinner color={colors.blue}/> : renderTasks()}
            </div>
        </section>
    )
}

export default Tasks;