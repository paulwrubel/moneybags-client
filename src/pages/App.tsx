import { useState } from "react";
import { useAuth } from "auth/AuthProvider";
import { Stack, Typography, Grid } from "@mui/material";
import { useProtectedAPI } from "api/API";
import { useQuery } from "react-query";
import { processAPIError } from "Utils";
import UserAccount from "models/UserAccount";
import MenuPanel from "components/MenuPanel";
import SidePanel from "components/SidePanel";
import Loading from "pages/Loading";
import CenterPanel from "components/CenterPanel";

const App: React.FC = () => {
    // const api = useAuth().protectedAPI();
    const auth = useAuth();
    const api = useProtectedAPI();

    const { isLoading, isError, data, error } = useQuery<UserAccount, Error>(
        ["user-account"],
        () => {
            // console.log("In App making API call: " + accessToken);
            return api.getUserAccount();
        },
    );

    const [errString, setErrString] = useState<string>("");

    if (isLoading) {
        return <Loading reason="Gathering User Info" />;
    }

    if (isError) {
        processAPIError(error, (errString) => {
            console.error(errString);
            setErrString(errString);
        });
        return (
            <Typography variant="h2" color="error">
                Error: {errString}
            </Typography>
        );
    }

    const username = data?.username || "";

    return (
        <>
            <Stack spacing={0} sx={{ height: "100vh" }}>
                <MenuPanel username={username} />
                <Grid container sx={{ height: 1 }}>
                    <Grid item xs={10}>
                        <CenterPanel />
                    </Grid>
                    <Grid item xs={2}>
                        <SidePanel />
                    </Grid>
                </Grid>
            </Stack>
        </>
        // <Typography variant="h2">
        //     Welcome to Moneybags, {data?.username}!
        // </Typography>
    );
};

export default App;
