import { TaskType } from "../types/taskType"
import EmptyText from "../../../UI/EmptyText/EmptyText";
import TaskItem from "../components/TaskItem";

const renderTasks = (tasks: TaskType[], deleteTask: (id: number) => void) => {
    if(tasks.length === 0) {
        return <EmptyText text="Нет запланированных задач"/>
    }
    return tasks.map((task : any) => {
        return <TaskItem key={task.id} {...task} deleteTask={() => deleteTask(task.id)}/>
    });
}

export default renderTasks;