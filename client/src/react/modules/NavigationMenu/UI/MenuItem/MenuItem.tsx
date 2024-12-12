import { FC, ReactElement } from "react"
import { IconType } from "react-icons"
import { Link } from "react-router-dom"

import "./menu_item.scss"

type MenuItemPropsType = {
    icon: ReactElement<IconType>,
    active?: boolean,
    path: string,
    title: string,
    className?: string,
    onClick?: () => void
}

const MenuItem : FC<MenuItemPropsType> = ({icon, path, title, className, active, onClick}) => {
    return (
        <div className={`menu__item ${active ? "menu__item-active" : ""} ${className}`}>
            <Link onClick={onClick} to={path}>
                {icon}
                <span>{title}</span>
            </Link>
        </div>
    )
}

export default MenuItem