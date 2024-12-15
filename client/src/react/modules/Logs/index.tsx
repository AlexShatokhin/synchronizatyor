import { useState } from "react";
import { useTypedSelector } from "../../hooks/useRedux";
import LogItem from "./components/LogItem/LogItem";

import "./logs.scss"
import { SynchronizationStatusEnum } from "../../types/SynchronizationStatusEnum";
import LogFilters from "./components/LogFitlers/LogFilters";

const Logs = () => {
    const logs = useTypedSelector(state => state.logSlice.logs);

    const getEnumByStatus = (status: "success" | "error") => 
        status === "success" ? SynchronizationStatusEnum.COMPLETE : SynchronizationStatusEnum.FAIL;
    
    const renderLogs = () => {
        return logs.map((log, index) => 
            <LogItem 
                key={index} 
                time={log.created_at} 
                message={log.message} 
                type={getEnumByStatus(log.status)} />
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