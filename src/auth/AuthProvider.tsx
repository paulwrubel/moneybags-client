import User from "models/User";
import { useState } from "react";
import { useAPI } from "api/APIContext";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";
import { KyInstance } from "ky/distribution/types/ky";
import Token from "models/Token";

const AuthProvider: React.FC = ({ children }) => {
    const api = useAPI() as KyInstance;

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string>("");

    const login = (
        username: string,
        password: string,
        callback?: VoidFunction,
    ) => {
        api.post("auth/token", { json: { username, password } })
            .json<Token>()
            .then(({ access_token }) => {
                setAccessToken(access_token);
                setUser({
                    id: "__unknown__",
                    username: username,
                    email: "__unknown__",
                });
                setIsAuthenticated(true);
                if (callback !== undefined) {
                    callback();
                }
            });
    };

    const logout = (callback?: VoidFunction) => {
        setUser(null);
        setIsAuthenticated(false);
        setAccessToken("");
        if (callback !== undefined) {
            callback();
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                accessToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
