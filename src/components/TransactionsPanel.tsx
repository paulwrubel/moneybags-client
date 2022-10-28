import { useState } from "react";

import { Box, Collapse } from "@mui/material";

import { Navigate, useParams } from "react-router-dom";

import AddTransactionRow from "components/AddTransactionRow";
import TransactionsHeader from "components/TransactionsHeader";
import TransactionsLabelsRow from "components/TransactionsLabelsRow";
import TransactionsList from "components/TransactionsList";
import { useAccount } from "data/Hooks";
import { Transaction } from "models/Budget";

const TransactionsPanel = () => {
    const params = useParams();
    const accountIDParam = params.accountID;

    const account = useAccount(accountIDParam || "");

    if (accountIDParam && !account) {
        return <Navigate to="../../accounts" />;
    }

    const [isAddingTransaction, setIsAddingTransaction] = useState(false);
    const [selectedTransactions, setSelectedTransactions] = useState<
        Transaction[]
    >([]);

    const showAllTransactions = !accountIDParam;

    const columnRatios = showAllTransactions
        ? [0.18, 0.1, 0.2, 0.35, 0.17]
        : [0.1, 0.2, 0.53, 0.17];

    // const headerHeight = 64;
    // const labelsHeight = 24;

    return (
        <Box sx={{ height: 1, display: "flex", flexDirection: "column" }}>
            <TransactionsHeader
                selectedTransactions={selectedTransactions}
                setSelectedTransactions={setSelectedTransactions}
                setIsAddingTransaction={setIsAddingTransaction}
                // styleHeight={headerHeight}
            />
            <TransactionsLabelsRow
                all={showAllTransactions}
                columnRatios={columnRatios}
                // styleHeight={labelsHeight}
            />
            {/* {isAddingTransaction && ( */}
            <Collapse in={isAddingTransaction}>
                <AddTransactionRow
                    account={account}
                    columnRatios={columnRatios}
                    isAddingTransaction={isAddingTransaction}
                    setIsAddingTransaction={setIsAddingTransaction}
                />
            </Collapse>
            {/* )} */}
            <TransactionsList
                selectedTransactions={selectedTransactions}
                setSelectedTransactions={setSelectedTransactions}
                account={account}
                columnRatios={columnRatios}
                // styleTop={headerHeight + labelsHeight}
            />
        </Box>
    );
};

export default TransactionsPanel;
