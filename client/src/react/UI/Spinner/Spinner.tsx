import { FC } from "react";
import "./spinner.scss"
import { colors } from "../../../constants/colors";

type SpinnerPropsType = {
    color?: string;
    size?: number;
    styles?: React.CSSProperties;
}

const Spinner : FC<SpinnerPropsType> = ({color = colors.white, size = 30, styles}) => {
    return (
        <div className="spinner">
            <span style = {{borderTopColor: color, width: size, height: size, ...styles}} className="loader"></span>
        </div>
    )
}

export default Spinner;