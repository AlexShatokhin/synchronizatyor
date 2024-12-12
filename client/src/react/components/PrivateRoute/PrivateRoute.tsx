import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"

type PrivateRouteProps = {
    isAuthenticated: boolean
}

const PrivateRoute : FC<PrivateRouteProps> = ({isAuthenticated}) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute;