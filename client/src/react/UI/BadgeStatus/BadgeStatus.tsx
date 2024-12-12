import { FC } from "react";
import { SynchronizationStatusEnum } from "../../types/SynchronizationStatusEnum";
import "./badgeStatus.scss";

type BadgeStatusProps = {
    status: SynchronizationStatusEnum,
    className?: string,
    showText?: boolean,
    text?: string
}

const BadgeStatus : FC<BadgeStatusProps> = ({status, showText, text, className}) => {
    return (
        <div className={`badge-status ${className}`}>
            <div className={`badge-status__icon badge-status__icon_${status}`}></div>
            {
                showText &&
                <div className="badge-status__text">{text || status}</div>
            }
        </div>        
    )
}

export default BadgeStatus;