import Login from "../../../modules/Login";
import Registration from "../../../modules/Registration";
import HomePage from "../../HomePage/HomePage";
import LogsPage from "../../LogsPage/LogsPage";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";
import SettingsPage from "../../SettingsPage/SettingsPage";

export const routes = [
    {path: "/", component: Login, isPrivate: false},
    {path: "/register", component: Registration, isPrivate: false},

    {path: "/home", component: HomePage, isPrivate: true},
    {path: "/logs", component: LogsPage, isPrivate: true},
    {path: "/settings", component: SettingsPage, isPrivate: true},

    {path: "*", component: NotFoundPage, isPrivate: false},

]