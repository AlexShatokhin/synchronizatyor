import { FC } from "react";
import BadgeStatus from "../../../../UI/BadgeStatus/BadgeStatus";
import { SynchronizationStatusEnum } from "../../../../types/SynchronizationStatusEnum";

import "./log_item.scss";

type LogItemPropsType = {
    time: string;
    message: string;
    type: string;
    status: SynchronizationStatusEnum.COMPLETE | SynchronizationStatusEnum.FAIL;
}

const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return `${getZero(dateObj.getDate())}.${getZero(dateObj.getMonth())}.${dateObj.getFullYear()} ${getZero(dateObj.getHours())}:${getZero(dateObj.getMinutes())}:${getZero(dateObj.getSeconds())}`
}

const formatType = (type : string) => {
    switch(type){
        case "mysql":
            return "MySQL";
        case "postgresql":
            return "PostgreSQL";
        default:
            return type.toUpperCase();
    }
}

const getZero = (num: number) => num < 9 ? `0${num}` : num;

const LogItem : FC<LogItemPropsType> = ({time, message, status, type}) => {
    return (
        <div className="log-item">
            <div className="log-item__text">{formatDate(time)}</div>
            <div className="log-item__text">{message}</div>
            <div className="log-item__text">{formatType(type)}</div>
            <div style={{fontWeight: 500}} className="log-item__text">
                <BadgeStatus status={status} showText/>
            </div>
        </div>
    )
}

export default LogItem;