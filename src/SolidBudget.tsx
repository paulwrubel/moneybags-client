// import APIProvider from "api/APIProvider";
// import { AuthProvider } from "auth/AuthProvider";
// import { QueryClientProvider, QueryClient } from "react-query";
import { ThemeProvider } from "@mui/material/styles";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider as ReduxStoreProvider } from "react-redux";

import { store as reduxStore } from "./data/Store";
import Router from "./Router";
import Theme from "./Theme";
// import { DataProvider } from "data/DataProvider";
// import { ProtectedAPIProvider } from "api/API";

// const queryClient = new QueryClient();

const SolidBudget: React.FC = () => {
    return (
        <>
            <ThemeProvider theme={Theme}>
                <ReduxStoreProvider store={reduxStore}>
                    <HelmetProvider>
                        <Helmet>
                            <title>SolidBudget</title>
                        </Helmet>
                        <Router />
                    </HelmetProvider>
                </ReduxStoreProvider>
            </ThemeProvider>
        </>
    );
};

export default SolidBudget;
