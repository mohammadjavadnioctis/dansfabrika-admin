import jwtDecode from "jwt-decode";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { cookies } from "src/definitions/Cookies/NewCookies";


const PrivateRoute = ({ component: component, ...rest }) => {
    const token = cookies.get('jwt')

    const decodeToken = token ? jwtDecode(token) : null

    // return (decodeToken && decodeToken.status === 1) ? <Outlet /> : <Navigate to="/login" />
    if (!decodeToken || decodeToken.status !== 1) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default PrivateRoute