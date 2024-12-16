import { useTypedSelector } from "../../hooks/useRedux";
import LogItem from "./components/LogItem/LogItem";

import "./logs.scss"
import { SynchronizationStatusEnum } from "../../types/SynchronizationStatusEnum";
import LogFilters from "./components/LogFitlers/LogFilters";
import EmptyText from "../../UI/EmptyText/EmptyText";

const Logs = () => {
    const logs = useTypedSelector(state => state.logSlice.logs);

    const getEnumByStatus = (status: "success" | "error") => 
        status === "success" ? SynchronizationStatusEnum.COMPLETE : SynchronizationStatusEnum.FAIL;
    
    const renderLogs = () => {
        if(logs.length === 0) 
            return <EmptyText text="Логи отсутствуют"/>
        return logs.map((log, index) => 
            <LogItem 
                key={index} 
                time={log.created_at} 
                message={log.message}
                type = {log.type}
                status={getEnumByStatus(log.status)} />
        )
    }


    return (
        <div className="logs page-module">
            <h1 className="page-title logs__title ">Логирование</h1>
            <LogFilters />
            {renderLogs()}
        </div>
    )
}

export default Logs;