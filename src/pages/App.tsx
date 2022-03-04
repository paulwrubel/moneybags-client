import { useState, useEffect } from "react";
// import { useAPI } from "api/APIContext";
import { useAuth, AuthContextType } from "auth/AuthContext";
import { Typography } from "@mui/material";
// import { KyInstance } from "ky/distribution/types/ky";
import UserAccount from "models/UserAccount";
import { getUserAccount } from "api/API";
import ErrorResponse from "models/ErrorResponse";

const App: React.FC = () => {
    // const protectedAPI = (useAuth() as AuthContextType).protectedAPI;
    // const api = useAPI() as KyInstance;

    // const [username, setUsername] = useState("__UNKNOWN__");
    const userAccount = useUserAccount();

    // useEffect(() => {
    //     // protectedAPI
    //     //     .get("user-accounts")
    //     //     .json<UserAccount>()
    //     getUserAccount()
    //         .then(({ username }) => {
    //             setUsername(username);
    //         })
    //         .catch((err) => {
    //             setUsername("__ERROR__");
    //             console.error(err);
    //         });
    // });

    return (
        <Typography variant="h2">Welcome to Moneybags, {username}!</Typography>
    );
};

export default App;
