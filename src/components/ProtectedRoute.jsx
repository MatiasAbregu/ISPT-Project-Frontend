import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

export const ProtectedRoute = () => {
    const { user, authReady } = useContext(UserContext);

    if (!authReady) return null;

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
