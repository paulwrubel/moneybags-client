import APIProvider from "api/APIProvider";
import AuthProvider from "auth/AuthProvider";
import Router from "./Router";

const Moneybags: React.FC = () => {
    return (
        <APIProvider>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </APIProvider>
    );
};

export default Moneybags;
