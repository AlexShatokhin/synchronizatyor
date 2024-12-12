import { FC } from "react";
import "./title.scss";

type TitlePropsType = {
    title: string,
    className?: string
}

const Title : FC<TitlePropsType> = ({title, className}) => {
    return <span className={`title ${className}`}>{title}</span>
}

export default Title;