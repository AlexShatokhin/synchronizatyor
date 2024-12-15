import { useTypedSelector, useTypedDispatch } from "../../hooks/useRedux";
import { changeActiveElement } from "./slice/NavigationMenuSlice";
import { logout } from "../../slice/userSlice";
import useHttp from "../../hooks/useHttp";

import { SlLogout } from "react-icons/sl";
import { LuLogs } from "react-icons/lu";
import { MdDownload } from "react-icons/md";
import MenuItem from "./UI/MenuItem/MenuItem";

import "./navigation_menu.scss"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";

const NavigationMenu = () => {
    const {fetchData} = useHttp();
    const activeElement = useTypedSelector(state => state.NavigationMenu.activeElement);
    const {email, name} = useTypedSelector(state => state.userData);
    const dispatch = useTypedDispatch();
    const location = useLocation();

    const handleChangeActiveElement = (element : "logs" | "home" | "tasks") => {
        dispatch(changeActiveElement(element));
    }

    useEffect(() => {
        handleChangeActiveElement(location.pathname.slice(1) as "logs" | "home" | "tasks");
    }, [])

    const handleLogout = () => {
        dispatch(logout());
        fetchData("http://localhost:4000/api/logout", "POST");
    }

    return (
        <section className="menu">
            <div className="profile-info">
                <div className="profile-info__name">{name}</div>
                <div className="profile-info__email">{email}</div>
            </div>
            <MenuItem 
                active = {activeElement === "logs"} 
                onClick={() => handleChangeActiveElement("logs")}
                path="/logs" 
                icon={<LuLogs />} 
                title="Логирование" />

            <MenuItem 
                active = {activeElement === "home"}
                onClick={() => handleChangeActiveElement("home")}
                path="/home" 
                icon={<MdDownload />} 
                title="Синхронизация" />

            <MenuItem 
                active = {activeElement === "tasks"}
                onClick={() => handleChangeActiveElement("tasks")}
                path="/tasks" 
                icon={<FaRegClock />} 
                title="Запланированное" />


            <MenuItem 
                onClick={handleLogout} 
                className = "menu-logout" 
                path="/" 
                icon={<SlLogout />} 
                title="Выйти" />
        </section>
    )
}

export default NavigationMenu;