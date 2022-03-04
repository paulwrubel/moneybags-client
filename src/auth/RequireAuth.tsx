import { Location, Navigate, useLocation } from "react-router-dom";
import { useAuth, AuthContextType } from "./AuthContext";
import { Typography } from "@mui/material";
import { useState, useEffect, PropsWithChildren } from "react";

export interface Referral {
    from: Location;
}

export function isReferral(state: unknown): state is Referral {
    return (state as Referral)?.from !== undefined;
}

const AwaitRefresh: React.FC<PropsWithChildren<{ location: Location }>> = ({
    children,
    location,
}) => {
    const auth = useAuth() as AuthContextType;

    const [isRefreshing, setIsRefreshing] = useState(true);
    const [refreshSuccessful, setRefreshSuccessful] = useState(false);

    useEffect(() => {
        setIsRefreshing(true);
        auth.refreshToken()
            .then(() => {
                setRefreshSuccessful(true);
            })
            .catch(() => {
                setRefreshSuccessful(false);
            })
            .finally(() => {
                setIsRefreshing(false);
            });
    });

    return isRefreshing ? (
        <Typography variant="h1">Waiting for response...</Typography>
    ) : refreshSuccessful ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useAuth() as AuthContextType;
    const location = useLocation();

    return auth.accessToken === null ? (
        <AwaitRefresh location={location}>{children}</AwaitRefresh>
    ) : (
        <>{children}</>
    );
};

export default RequireAuth;
