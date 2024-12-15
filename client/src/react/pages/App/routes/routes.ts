import Login from "../../../modules/Login";
import Registration from "../../../modules/Registration";
import HomePage from "../../HomePage/HomePage";
import LogsPage from "../../LogsPage/LogsPage";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";
import TasksPage from "../../TasksPage/TasksPage";

export const routes = [
    {path: "/", component: Login, isPrivate: false},
    {path: "/register", component: Registration, isPrivate: false},

    {path: "/home", component: HomePage, isPrivate: true},
    {path: "/logs", component: LogsPage, isPrivate: true},
    {path: "/tasks", component: TasksPage, isPrivate: true},

    {path: "*", component: NotFoundPage, isPrivate: false},

]