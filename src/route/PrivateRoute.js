import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { cookies } from "src/definitions/Cookies/NewCookies";


const PrivateRoute = ({ component: component, ...rest}) => {
    const token = cookies.get('jwt')
    return (token) ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute