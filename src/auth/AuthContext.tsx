import { KyInstance } from "ky/distribution/types/ky";
import ErrorResponse from "models/ErrorResponse";
import { createContext, useContext } from "react";

export interface AuthContextType {
    accessToken: string | null;
    refreshToken: () => Promise<void>;
    login: (
        username: string,
        password: string,
        callbacks?: {
            onSuccess?: VoidFunction;
            onError?: (error: ErrorResponse) => void;
        },
    ) => void;
    logout: (callback?: VoidFunction) => void;
    protectedAPI: KyInstance;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useProtectedAPI = () => {
    return useAuth()?.protectedAPI;
};
