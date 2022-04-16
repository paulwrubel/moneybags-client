import { Location, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Typography } from "@mui/material";
import { useState, useEffect, PropsWithChildren } from "react";
// import { postRefreshToken } from "api/API";
import { useQuery, useQueryClient } from "react-query";
import Token from "models/Token";
import { isHTTPError, processAPIError } from "Utils";
import Loading from "pages/Loading";
import { useProtectedAPI } from "api/API";

export interface Referral {
    from: Location;
}

export function isReferral(state: unknown): state is Referral {
    return (state as Referral)?.from !== undefined;
}

// const AwaitRefresh: React.FC<PropsWithChildren<{ location: Location }>> = ({
//     children,
//     location,
// }) => {
//     const auth = useAuth() as AuthContextType;
//
//     const [isRefreshing, setIsRefreshing] = useState(true);
//     const [refreshSuccessful, setRefreshSuccessful] = useState(false);
//
//     const
//
//     useEffect(() => {
//         setIsRefreshing(true);
//         auth.refreshToken()
//             .then(() => {
//                 setRefreshSuccessful(true);
//             })
//             .catch(() => {
//                 setRefreshSuccessful(false);
//             })
//             .finally(() => {
//                 setIsRefreshing(false);
//             });
//     });
//
//     return isRefreshing ? (
//         <Typography variant="h1">Waiting for response...</Typography>
//     ) : refreshSuccessful ? (
//         <>{children}</>
//     ) : (
//         <Navigate to="/login" replace state={{ from: location }} />
//     );
// };

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    const queryClient = useQueryClient();
    const api = useProtectedAPI();
    const navigate = useNavigate();

    // const [isSettingAccessToken, setIsSettingAccessToken] = useState(false);

    // const [newAccessToken, setNewAccessToken] = useState<string | null>(null);
    // const [qIsLoading, setQIsLoading] = useState(true);
    // const [qIsError, setQIsError] = useState(false);
    // const [qErrString, setQErrString] = useState("");

    const { isLoading, isError, isIdle, data, error, refetch } = useQuery<
        Token,
        Error
    >("post-refresh-token", () => api.postRefreshToken(), {
        enabled: false,
        retry: (count, error) => {
            if (isHTTPError(error) && error.response.status === 401) {
                return false;
            }
            return count <= 3;
        },
    });

    useEffect(() => {
        if (isIdle) {
            return;
        }
        // setIsSettingAccessToken(true);
        // if (!isLoading && !isError) {
        // setQIsLoading(isLoading);
        // setQIsError(isError);
        // if (qIsError) {
        //     processAPIError(error, setQErrString);
        // }
        // if (!qIsLoading) {
        //     setNewAccessToken((data as Token).access_token);
        // }
        if (!isIdle && !isLoading && !isError) {
            const accessToken = (data as Token).access_token;
            console.log("We've got the new token! RequireAuth: " + accessToken);
            auth.setNewAccessToken(accessToken);
            // setIsSettingAccessToken(false);

            // queryClient.invalidateQueries("post-access-token");
        }
    });

    if (auth.accessToken !== null) {
        console.log("in Require Auth: " + auth.accessToken);
        console.log("We're all good! rendering children!");
        return <>{children}</>;
    }

    refetch();

    if (isIdle) {
        console.log("We're idling...");
        return <Loading reason="We're just idling in RequireAuth for fun!" />;
    }

    if (isLoading) {
        console.log("Loading refresh results...");
        return <Loading reason="Attempting to refresh access token" />;
    }

    if (isError) {
        console.error("Error refreshing token...");
        processAPIError(error, (errString) => {
            console.error(errString);
        });
        console.log("returning navigate");
        navigate("/login", { state: { from: location }, replace: true });
        // return <Navigate to="/login" replace state={{ from: location }} />;
    }

    console.log("We've refreshed! rendering children!");
    return <>{children}</>;
};

export default RequireAuth;
