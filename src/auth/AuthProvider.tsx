import { useState, useEffect, createContext, useContext } from "react";
// import { useAPI } from "api/APIContext";
// import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";
import { KyInstance } from "ky/distribution/types/ky";
import Token from "models/Token";
import { HTTPError } from "ky";
import ErrorResponse from "models/ErrorResponse";
import { useQuery } from "react-query";
import { postLogin } from "api/API";

// AuthContext

export interface AuthContext {
    accessToken: string | null;
    setNewAccessToken: (newToken: string | null) => void;
    getAccessToken: () => string | null;
    login: (
        username: string,
        password: string,
        // callbacks?: {
        //     onSuccess?: VoidFunction;
        //     onError?: (error: ErrorResponse) => void;
        // },
    ) => Promise<void>;
    // logout: (callback?: VoidFunction) => void;
    // protectedAPI: () => KyInstance;
}

const Auth = createContext<AuthContext | undefined>(undefined);

export const useAuth: () => AuthContext = () => {
    const a = useContext(Auth);
    if (!a) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return a;
};

// export const useProtectedAPI = () => {
//     return useAuth()?.protectedAPI;
// };

// AuthProvider

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // const api = useAPI() as KyInstance;

    const [accessToken, setAccessToken] = useState<string | null>(null);

    //     const refreshToken: () => Promise<void> = () => {
    //         const { isLoading, isError, data, error } = useQuery<Token, Error>(
    //             "refresh-token",
    //             () => postRefreshToken(api),
    //         );
    //
    //
    //
    //         return api
    //             .post("auth/refresh-token")
    //             .json<Token>()
    //             .then(({ access_token }) => {
    //                 setAccessToken(access_token);
    //             })
    //             .catch((err: HTTPError) => {
    //                 err.response.json().then((errorResponse: ErrorResponse) => {
    //                     setAccessToken(null);
    //                     console.error(
    //                         errorResponse.errors.map((e) => e.message).join("\n"),
    //                     );
    //                 });
    //                 throw err;
    //             });
    //     };

    const login: (
        username: string,
        password: string,
        // callbacks?: {
        //     onSuccess?: VoidFunction;
        //     onError?: (errorResponse: ErrorResponse) => void;
        // },
    ) => Promise<void> = (username, password) => {
        return (
            postLogin(username, password)
                // api.post("auth/login", {
                //     json: { username, password },
                //     credentials: "include",
                // })
                //     .json<Token>()
                .then(({ access_token }) => {
                    setAccessToken(access_token);
                    // callbacks?.onSuccess?.();
                })
                .catch((e: unknown) => {
                    // console.error(err);
                    // err.response.json().then((errorResponse: ErrorResponse) => {
                    setAccessToken(null);
                    throw e;
                })
        );
    };

    // const logout = (callback?: VoidFunction) => {
    //     setAccessToken(null);
    //     callback?.();
    // };

    // const protectedAPI: () => KyInstance = () =>
    //     api.extend({
    //         credentials: "include",
    //         hooks: {
    //             beforeRequest: [
    //                 (request) => {
    //                     console.log("beforeRequest: " + accessToken);
    //                     request.headers.set(
    //                         "Authorization",
    //                         `Bearer ${accessToken}`,
    //                     );
    //                 },
    //             ],
    //         },
    //     });

    // useEffect(() => {
    //     setInterval(() => {
    //         refreshToken();
    //     }, 10 * 60 * 1000);
    // });

    return (
        <Auth.Provider
            value={{
                accessToken,
                setNewAccessToken: (newToken) => {
                    console.log(newToken);
                    setAccessToken(newToken);
                },
                getAccessToken: () => {
                    console.log(
                        "returning from getAccessToken(): " + accessToken,
                    );
                    return accessToken;
                },
                login,
                // logout,
                // protectedAPI,
            }}
        >
            {children}
        </Auth.Provider>
    );
};

// export default AuthProvider;
