import { KyInstance } from "ky/distribution/types/ky";
import { createContext, useContext } from "react";

export const APIContext = createContext<KyInstance | undefined>(undefined);

export const useAPI = () => {
    return useContext(APIContext);
};
