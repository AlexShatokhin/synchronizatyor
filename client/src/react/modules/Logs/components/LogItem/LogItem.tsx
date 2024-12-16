import { FC } from "react";
import BadgeStatus from "../../../../UI/BadgeStatus/BadgeStatus";
import { SynchronizationStatusEnum } from "../../../../types/SynchronizationStatusEnum";
import { formatDate } from "../../../../utils/formatDate";
import { formatType } from "../../../../utils/formatType";
import "./log_item.scss";

type LogItemPropsType = {
    time: string;
    message: string;
    type: string;
    status: SynchronizationStatusEnum.COMPLETE | SynchronizationStatusEnum.FAIL;
}


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