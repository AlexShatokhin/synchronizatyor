import { FC } from "react";
import { SynchronizationStatusEnum } from "../../types/SynchronizationStatusEnum";
import "./BadgeStatus.scss";

type BadgeStatusProps = {
    status: SynchronizationStatusEnum,
    showText?: boolean,
}

const BadgeStatus : FC<BadgeStatusProps> = ({status, showText}) => {
    return (
        <div className="badge-status">
            <div className={`badge-status__icon badge-status__icon_${status}`}></div>
            {
                showText &&
                <div className="badge-status__text">{status}</div>
            }
        </div>        
    )
}

export default BadgeStatus;