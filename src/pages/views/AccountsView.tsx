import { Grid, Paper } from "@mui/material";

import { Navigate, Route, Routes } from "react-router-dom";

import TransactionsPanel from "components/transactions/TransactionsPanel";

const AccountsView: React.FC = () => {
    return (
        <>
            <Grid item xs={9}>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        height: 1,
                        maxHeight: "100vh",
                        maxWidth: "100vw",
                        bgcolor: "white",
                        overflow: "auto",
                    }}
                    // color="blue"
                >
                    <Routes>
                        <Route index element={<TransactionsPanel />}></Route>
                        <Route
                            path=":accountID"
                            element={<TransactionsPanel />}
                        ></Route>
                        <Route
                            path="*"
                            element={<Navigate to="../../accounts" />}
                        ></Route>
                    </Routes>
                </Paper>
            </Grid>
        </>
    );
};

export default AccountsView;
