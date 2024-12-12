import Login from "../../../modules/Login";
import Registration from "../../../modules/Registration";

export const routes = [
    {path: "/", component: Login, isPrivate: false},
    {path: "/register", component: Registration, isPrivate: false},

    {path: "/home", component: () => <></>, isPrivate: true},
    {path: "/settings", component: () => <></>, isPrivate: true},

    {path: "*", component: () => <></>, isPrivate: false},

]