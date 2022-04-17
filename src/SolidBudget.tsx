// import APIProvider from "api/APIProvider";
// import { AuthProvider } from "auth/AuthProvider";
// import { QueryClientProvider, QueryClient } from "react-query";
import Router from "./Router";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme";
import { DataProvider } from "data/DataProvider";
// import { ProtectedAPIProvider } from "api/API";

// const queryClient = new QueryClient();

const SolidBudget: React.FC = () => {
    return (
        <ThemeProvider theme={Theme}>
            {/* <QueryClientProvider client={queryClient}> */}
            {/* <AuthProvider> */}
            {/* <ProtectedAPIProvider> */}
            <DataProvider>
                <Router />
            </DataProvider>
            {/* </ProtectedAPIProvider> */}
            {/* </AuthProvider> */}
            {/* </QueryClientProvider> */}
        </ThemeProvider>
    );
};

export default SolidBudget;
