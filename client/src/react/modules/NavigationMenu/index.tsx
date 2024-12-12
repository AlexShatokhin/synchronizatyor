import { useTypedSelector, useTypedDispatch } from "../../hooks/useRedux";
import { changeActiveElement } from "./slice/NavigationMenuSlice";
import { logout } from "../../slice/userSlice";
import useHttp from "../../hooks/useHttp";

import { SlLogout } from "react-icons/sl";
import { IoMdSettings } from "react-icons/io";
import { LuLogs } from "react-icons/lu";
import { MdDownload } from "react-icons/md";
import MenuItem from "./UI/MenuItem/MenuItem";

import "./navigation_menu.scss"

const NavigationMenu = () => {
    const {fetchData} = useHttp();
    const activeElement = useTypedSelector(state => state.NavigationMenu.activeElement);
    const {email, name} = useTypedSelector(state => state.userData);
    const dispatch = useTypedDispatch();

    const handleChangeActiveElement = (element : "logs" | "home" | "settings") => {
        dispatch(changeActiveElement(element));
    }

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload();
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
                active = {activeElement === "settings"}
                onClick={() => handleChangeActiveElement("settings")}
                path="/settings" 
                icon={<IoMdSettings />} 
                title="Настройки" />


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