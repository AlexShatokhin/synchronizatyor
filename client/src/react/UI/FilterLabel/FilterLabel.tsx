import { FC } from "react"

import "./filter_label.scss"
type FilterLabelPropsType = {
    label: string,
    icon?: JSX.Element
}

const FilterLabel : FC<FilterLabelPropsType> = ({icon, label}) => {
    return (
        <div className="filter-label">
            <span className="icon">{icon}</span>
            <span className="label">{label}</span>
        </div>
    )
}

export default FilterLabel