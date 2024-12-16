import {FC} from "react";
import { MdDelete } from "react-icons/md";

import "./task_item.scss";

type TaskItemPropsType = {
    id: number,
    created_at: string,
    source: string,
    name: string,
}

const TaskItem : FC<TaskItemPropsType> = ({id, created_at, source, name}) => {

    const deleteTask = () => {
        console.log("Delete task:", id);
    }

    return (
        <div className="task-item">
            <h2>{source}</h2>
            <p>{created_at}</p>
            <p>{name}</p>
            <button onClick={deleteTask} className="delete"><MdDelete size={30}/></button>
        </div>
    )
}

export default TaskItem;