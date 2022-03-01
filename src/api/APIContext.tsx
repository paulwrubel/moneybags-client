import { KyInstance } from "ky/distribution/types/ky";
import { createContext, useContext } from "react";

export const APIContext = createContext<KyInstance | null>(null);

export const useAPI = () => {
    return useContext(APIContext);
};
