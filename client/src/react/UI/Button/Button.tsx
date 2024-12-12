import { FC } from "react";
import "./button.scss";

type ButtonPropsType = {
    title: string;
    className?: string;
    onClick?: () => void;
}

const Button : FC<ButtonPropsType> = ({title, className, onClick}) => {
    return (
        <button
            onClick={onClick} 
            className={`button ${className}`}>{title}</button>
    )
}

export default Button;