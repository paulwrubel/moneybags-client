import { Box } from "@mui/material";

import TransactionRow from "components/TransactionRow";
import { useTransactions } from "data/Hooks";
import { Account } from "models/Budget";

const TransactionsList = ({
    account,
    columnRatios,
}: {
    account?: Account;
    columnRatios: number[];
}) => {
    const allTransactions = useTransactions();

    const transactions = account
        ? allTransactions.filter(({ accountID }) => accountID === account.id)
        : allTransactions;

    return (
        // <Paper square elevation={0}>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
            }}
        >
            {transactions.map((transaction, index) => {
                return (
                    <TransactionRow
                        showAccount={!account}
                        columnRatios={columnRatios}
                        key={transaction.id}
                        index={index}
                        transaction={transaction}
                    />
                );
            })}
        </Box>
        // </Paper>
    );
};

export default TransactionsList;
