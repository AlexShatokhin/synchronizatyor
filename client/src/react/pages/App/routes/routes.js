export const routes = [
    {path: "/", component: null, isPrivate: false},
    {path: "/register", component: null, isPrivate: false},

    {path: "/home", component: null, isPrivate: true},
    {path: "/settings", component: null, isPrivate: true},

    {path: "*", component: null, isPrivate: false},

]