import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

export const ProtectedRoute = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};