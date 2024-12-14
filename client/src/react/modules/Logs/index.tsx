import { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useRedux"

import LogItem from "./LogItem/LogItem";

import useHttp from "../../hooks/useHttp";

import "./logs.scss"
import { SynchronizationStatusEnum } from "../../types/SynchronizationStatusEnum";
const Logs = () => {
    const [logs, setLogs] = useState<{
        created_at: string;
        message: string;
        status: "success" | "error";
    }[]>([]);
    const {id} = useTypedSelector(state => state.userData);
    const {fetchData} = useHttp();

    const getLogs = async () => {
        const data : {
            logs: {
                created_at: string;
                message: string;
                status: "success" | "error";
            }[]
        } = await fetchData(`http://localhost:4000/api/logs?id=${id}&type=all`, "GET")
        setLogs(data.logs);
    }

    const getEnumByStatus = (status: "success" | "error") => {
        return status === "success" ? SynchronizationStatusEnum.COMPLETE : SynchronizationStatusEnum.FAIL;
    }

    const renderLogs = () => {
        return logs.map((log, index) => {
            return <LogItem key={index} time={log.created_at} message={log.message} type={getEnumByStatus(log.status)} />
        })
    }

    useEffect(() => {
        if(id)
            getLogs();
    }, [id])

    return (
        <div className="logs">
            <h1>Logs page</h1>
            {renderLogs()}
        </div>
    )
}

export default Logs;