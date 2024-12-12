import { FC, ReactElement } from "react"
import { IconType } from "react-icons"
import { Link } from "react-router-dom"

import "./menu_item.scss"

type MenuItemPropsType = {
    icon: ReactElement<IconType>,
    active?: boolean,
    path: string,
    title: string,
    className?: string
}

const MenuItem : FC<MenuItemPropsType> = ({icon, path, title, className, active}) => {
    return (
        <div className={`menu__item ${active ? "menu__item-active" : ""} ${className}`}>
            <Link to={path}>
                {icon}
                <span>{title}</span>
            </Link>
        </div>
    )
}

export default MenuItem