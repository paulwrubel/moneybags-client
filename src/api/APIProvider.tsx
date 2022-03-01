import PropTypes from "prop-types";
import ky from "ky";
import { APIContext } from "./APIContext";

const APIProvider: React.FC = ({ children }) => {
    const kyInstance = ky.extend({
        prefixUrl: "http://10.0.0.7:50055/api/v1",
    });

    return (
        <APIContext.Provider value={kyInstance}>{children}</APIContext.Provider>
    );
};

APIProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default APIProvider;
