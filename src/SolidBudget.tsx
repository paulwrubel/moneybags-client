// import APIProvider from "api/APIProvider";
// import { AuthProvider } from "auth/AuthProvider";
// import { QueryClientProvider, QueryClient } from "react-query";
import Router from "./Router";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme";
// import { DataProvider } from "data/DataProvider";
// import { ProtectedAPIProvider } from "api/API";
import { store as reduxStore } from "./data/Store";
import { Provider as ReduxStoreProvider } from "react-redux";

// const queryClient = new QueryClient();

const SolidBudget: React.FC = () => {
    return (
        <ThemeProvider theme={Theme}>
            <ReduxStoreProvider store={reduxStore}>
                <Router />
            </ReduxStoreProvider>
        </ThemeProvider>
    );
};

export default SolidBudget;
