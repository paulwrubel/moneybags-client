import PropTypes from "prop-types";
import ky from "ky";
import { APIContext } from "./APIContext";

const APIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const kyInstance = ky.extend({
        prefixUrl: "/api/v1",
    });

    return (
        <APIContext.Provider value={kyInstance}>{children}</APIContext.Provider>
    );
};

export default APIProvider;
