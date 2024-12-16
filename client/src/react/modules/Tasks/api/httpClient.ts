import { HOST, PORT } from "../../../../constants/port";
import useHttp from "../../../hooks/useHttp";

export const useFetchTasks = () => {
    const {fetchData, loading, error} = useHttp()

    const fetchTasks = async () => {
        return await fetchData(`http://${HOST}:${PORT}/api/schedule`, "GET")
    }

    const deleteTask = async (id: number) => {
        await fetchData(`http://${HOST}:${PORT}/api/schedule/`, "DELETE", JSON.stringify({taskID: id}))
    }

    return {fetchTasks, deleteTask, loading, error}
}