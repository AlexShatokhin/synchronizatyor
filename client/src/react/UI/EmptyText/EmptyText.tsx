import {FC} from "react";
import "./empty_text.scss";
type EmptyTextPropsType = {
    text: string;
}

const EmptyText : FC<EmptyTextPropsType> = ({ text }) => {
    return (
        <div className="empty-text">
            {text}
        </div>
    )
}

export default EmptyText;