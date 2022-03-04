import { Button, TextField, Typography } from "@mui/material";
import { useAuth, AuthContextType } from "auth/AuthContext";
import { isReferral } from "auth/RequireAuth";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const auth = useAuth() as AuthContextType;

    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const fromLocation = isReferral(location.state)
        ? location.state.from.pathname
        : "/";

    return (
        <>
            <Typography variant="body1" color="error">
                {errorMessage}
            </Typography>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <Button
                variant="text"
                onClick={() => {
                    auth.login(username, password, {
                        onSuccess: () => {
                            navigate(fromLocation, { replace: true });
                        },
                        onError: ({ errors }) => {
                            setErrorMessage(
                                errors.map((e) => e.message).join("\n"),
                            );
                        },
                    });
                }}
            >
                Submit
            </Button>
        </>
    );
};

export default Login;
