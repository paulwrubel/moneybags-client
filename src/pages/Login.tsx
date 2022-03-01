import { Button, TextField } from "@mui/material";
import { useAuth, AuthContextType } from "auth/AuthContext";
import User from "models/User";
import { useState } from "react";

const Login: React.FC = () => {
    const auth = useAuth() as AuthContextType;

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <>
            {auth.isAuthenticated ? (
                <>
                    <p>
                        You are logged in! Welcome to Moneybags,{" "}
                        {(auth.user as User).username}
                    </p>
                    <p>
                        Here is your access token:{" "}
                        <code>{auth.accessToken}</code>
                    </p>
                </>
            ) : (
                <p>You are NOT logged in... :(</p>
            )}
            <TextField
                label="Username"
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <TextField
                type="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <Button
                variant="text"
                onClick={() => {
                    auth.login(username, password);
                }}
            >
                Submit
            </Button>
        </>
    );
};

export default Login;
