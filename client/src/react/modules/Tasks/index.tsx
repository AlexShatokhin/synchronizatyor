import { useState, useEffect } from "react";
import useHttp from "../../hooks/useHttp";

import Spinner from "../../UI/Spinner/Spinner";
import { colors } from "../../../constants/colors";
import TaskItem from "./components/TaskItem";

import "./tasks.scss";
import EmptyText from "../../UI/EmptyText/EmptyText";
const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const { fetchData, loading } = useHttp();

    const getTasks = () => {
        fetchData(`http://localhost:4000/api/schedule`, "GET")
        .then((response) => setTasks(response))
        .catch((error) => {
            console.log("Error:", error);
        });
    }

    const deleteTask = (id: number) => {
        fetchData(`http://localhost:4000/api/schedule/`, "DELETE", JSON.stringify({taskID: id}))
        .then(() => getTasks())
        .catch((error) => {
            console.log("Error:", error);
        });
    }

    const renderTasks = () => {
        if(tasks.length === 0) {
            return <EmptyText text="Нет запланированных задач"/>
        }
        return tasks.map((task : any) => {
            return <TaskItem key={task.id} {...task} deleteTask={() => deleteTask(task.id)}/>
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
                : renderTasks()}
            </div>
        </section>
    )
}

export default Tasks;