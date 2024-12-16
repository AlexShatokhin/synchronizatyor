import { useState, useEffect } from "react";
import { useFetchTasks } from "./api/httpClient";

import Spinner from "../../UI/Spinner/Spinner";
import { colors } from "../../../constants/colors";

import "./tasks.scss";
import renderTasks from "./helpers/renderTasks";
import { TaskType } from "./types/taskType";
const Tasks = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const {loading, fetchTasks, deleteTask} = useFetchTasks();

    const getTasks = () => {
        fetchTasks()
        .then((response) => setTasks(response))
        .catch((error) => {
            console.log("Error:", error);
        });
    }

    const handleDeleteTask = (id: number) => {
        deleteTask(id)
        .then(() => getTasks())
        .catch((error) => {
            console.log("Error:", error);
        });
    }


    useEffect(() => {
        getTasks();
    }, []);

    return (
        <section className="tasks page-module">
            <h1 className="page-title">Запланированные задачи</h1>
            <div className="tasks__content">
                {loading ? 
                <div className="spinner-container">
                    <Spinner size={90} color={colors.blue}/> 
                </div>
                : renderTasks(tasks, handleDeleteTask)}
            </div>
        </section>
    )
}

export default Tasks;