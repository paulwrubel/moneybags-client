import { Grid, Paper } from "@mui/material";

import TransactionsHeader from "components/TransactionsHeader";
import TransactionsList from "components/TransactionsList";

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
                    <TransactionsHeader />
                    <TransactionsList />
                </Paper>
            </Grid>
        </>
    );
};

export default AccountsView;
