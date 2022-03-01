import User from "models/User";
import { createContext, useContext } from "react";

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string;
    login: (
        username: string,
        password: string,
        callback?: VoidFunction,
    ) => void;
    logout: (callback?: VoidFunction) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};
