import useHttp from "../../../hooks/useHttp"

const useFetchData = () => {
    const { fetchData, loading, error } = useHttp();

    const postData = async (data : any) => {
        return await fetchData(`http://localhost:4000/api/schedule`, "POST", JSON.stringify(data))
    }

    return { postData, loading, error }
}

export default useFetchData