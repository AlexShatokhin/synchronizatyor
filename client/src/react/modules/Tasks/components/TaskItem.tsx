import {FC} from "react";
import { MdDelete } from "react-icons/md";

import "./task_item.scss";
import { formatDate } from "../../../utils/formatDate";
import { formatType } from "../../../utils/formatType";

type TaskItemPropsType = {
    id: number,
    created_at: string,
    cron_expression: string,
    source: string,
    name: string,
}

const TaskItem : FC<TaskItemPropsType> = ({id, created_at, source, name, cron_expression}) => {

    const deleteTask = () => {
        console.log("Delete task:", id);
    }

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


const daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

const decodeCronExpression = (cronExpression: string): string => {
    const [minute, hour, , , days] = cronExpression.split(' ');

    const daysArray = days.split(',').map(day => daysOfWeek[parseInt(day)]);
    const daysString = daysArray.join(', ');

    return `Каждые ${daysString} ${hour}:${minute}`;
};
