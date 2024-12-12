import Login from "../../../modules/Login";
import Registration from "../../../modules/Registration";
import LogsPage from "../../LogsPage/LogsPage";

export const routes = [
    {path: "/", component: Login, isPrivate: false},
    {path: "/register", component: Registration, isPrivate: false},

    {path: "/home", component: () => <></>, isPrivate: true},
    {path: "/logs", component: LogsPage, isPrivate: true},
    {path: "/settings", component: () => <></>, isPrivate: true},

    {path: "*", component: () => <></>, isPrivate: false},

]