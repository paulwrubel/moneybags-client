// import APIProvider from "api/APIProvider";
import { AuthProvider } from "auth/AuthProvider";
import { QueryClientProvider, QueryClient } from "react-query";
import Router from "./Router";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme";
import { ProtectedAPIProvider } from "api/API";

const queryClient = new QueryClient();

const Moneybags: React.FC = () => {
    return (
        <ThemeProvider theme={Theme}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ProtectedAPIProvider>
                        <Router />
                    </ProtectedAPIProvider>
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default Moneybags;
