import useHttp from "../../../hooks/useHttp";

export const useFetchTasks = () => {
    const {fetchData, loading, error} = useHttp()

    const fetchTasks = async () => {
        return await fetchData(`http://localhost:4000/api/schedule`, "GET")
    }

    const deleteTask = async (id: number) => {
        await fetchData(`http://localhost:4000/api/schedule/`, "DELETE", JSON.stringify({taskID: id}))
    }

    return {fetchTasks, deleteTask, loading, error}
}