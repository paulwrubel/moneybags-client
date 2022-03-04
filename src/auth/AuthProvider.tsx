import { useState, useEffect } from "react";
import { useAPI } from "api/APIContext";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";
import { KyInstance } from "ky/distribution/types/ky";
import Token from "models/Token";
import { HTTPError } from "ky";
import ErrorResponse from "models/ErrorResponse";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const api = useAPI() as KyInstance;

    const [accessToken, setAccessToken] = useState<string | null>(null);

    const refreshToken: () => Promise<void> = () => {
        return api
            .post("auth/refresh-token", { credentials: "include" })
            .json<Token>()
            .then(({ access_token }) => {
                setAccessToken(access_token);
            })
            .catch((err: HTTPError) => {
                err.response.json().then((errorResponse: ErrorResponse) => {
                    setAccessToken(null);
                    console.error(
                        errorResponse.errors.map((e) => e.message).join("\n"),
                    );
                });
                throw err;
            });
    };

    const login: (
        username: string,
        password: string,
        callbacks?: {
            onSuccess?: VoidFunction;
            onError?: (errorResponse: ErrorResponse) => void;
        },
    ) => void = (username, password, callbacks) => {
        api.post("auth/login", {
            json: { username, password },
            credentials: "include",
        })
            .json<Token>()
            .then(({ access_token }) => {
                setAccessToken(access_token);
                callbacks?.onSuccess?.();
            })
            .catch((err: HTTPError) => {
                // console.error(err);
                err.response.json().then((errorResponse: ErrorResponse) => {
                    setAccessToken(null);
                    callbacks?.onError?.(errorResponse);
                });
            });
    };

    const logout = (callback?: VoidFunction) => {
        setAccessToken(null);
        if (callback !== undefined) {
            callback();
        }
    };

    const protectedAPI: KyInstance = api.extend({
        credentials: "include",
        hooks: {
            beforeRequest: [
                (request) => {
                    request.headers.set(
                        "Authorization",
                        `Bearer ${accessToken}`,
                    );
                },
            ],
        },
    });

    useEffect(() => {
        setInterval(() => {
            refreshToken();
        }, 10 * 60 * 1000);
    });

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                login,
                logout,
                protectedAPI,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
