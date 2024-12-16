import {FC} from "react";
import { MdDelete } from "react-icons/md";

import "./task_item.scss";
import { formatDate } from "../../../utils/formatDate";
import { formatType } from "../../../utils/formatType";
import decodeCronExpression from "../../../utils/decodeCron";
import { TaskType } from "../types/taskType";

type TaskItemPropsType = TaskType & {
    deleteTask: () => void
}

const TaskItem : FC<TaskItemPropsType> = ({created_at, source, name, cron_expression, deleteTask}) => {
    return (
        <div className="task-item">
            <p style={{fontWeight: 500}}>{formatType(source)}</p>
            <p>{decodeCronExpression(cron_expression)}</p>
            <h3>{name}</h3>
            <p>{formatDate(created_at)}</p>
            <button onClick={deleteTask} className="delete"><MdDelete size={30}/></button>
        </div>
    )
}

export default TaskItem;


