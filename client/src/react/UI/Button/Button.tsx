import { FC } from "react";
import "./button.scss";

type ButtonPropsType = {
    title: string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

const Button : FC<ButtonPropsType> = ({title, className, onClick, disabled}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick} 
            className={`button ${className}`}>{title}</button>
    )
}

export default Button;