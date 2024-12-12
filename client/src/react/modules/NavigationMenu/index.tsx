import { SlLogout } from "react-icons/sl";
import { IoMdSettings } from "react-icons/io";
import { LuLogs } from "react-icons/lu";
import { MdDownload } from "react-icons/md";
import MenuItem from "./UI/MenuItem/MenuItem";

import "./navigation_menu.scss"

const NavigationMenu = () => {

    return (
        <section className="menu">
            <div className="profile-info">
                <div className="profile-info__name">Test</div>
                <div className="profile-info__email">test@test</div>
            </div>
            <MenuItem active path="/logs" icon={<LuLogs />} title="Логирование" />
            <MenuItem path="/home" icon={<MdDownload />} title="Синхронизация" />
            <MenuItem path="/settings" icon={<IoMdSettings />} title="Настройки" />
            <MenuItem className = "menu-logout" path="/" icon={<SlLogout />} title="Выйти" />
        </section>
    )
}

export default NavigationMenu;