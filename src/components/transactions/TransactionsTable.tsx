import { forwardRef } from "react";

import { Box } from "@mui/material";

// import AddTransactionRow from "components/transactions/AddTransactionRow";
import TransactionsLabelsRow from "components/transactions/TransactionsLabelsRow";
import TransactionsList from "components/transactions/TransactionsList";
import { Account, Transaction } from "models/Budget";

const TransactionsTable = forwardRef<
    React.Ref<unknown>,
    {
        // isAddingTransaction: boolean;
        // setIsAddingTransaction: (isAddingTransaction: boolean) => void;
        transientTransactionID: string | null;
        setTransientTransactionID: (id: string | null) => void;
        account?: Account;
        transactions: Transaction[];
        onRowClick: (
            t: Transaction,
            wasCheckClicked: boolean,
            isShiftHeld: boolean,
            isCtrlHeld: boolean,
        ) => void;
        isSelected: (t: Transaction) => boolean;
        isEditing: (t: Transaction) => boolean;
        clearTransactionState: (t: Transaction) => void;
        setOnListInteraction: (onListInteraction: () => void) => void;
    }
>(
    (
        {
            // isAddingTransaction,
            // setIsAddingTransaction,
            // transientTransactionID,
            // setTransientTransactionID,
            account,
            transactions,
            onRowClick,
            isSelected,
            isEditing,
            clearTransactionState,
            setOnListInteraction,
        },
        ref,
    ) => {
        const showAllTransactions = !account;

        const columnRatios = showAllTransactions
            ? [0.18, 0.1, 0.2, 0.35, 0.085, 0.085]
            : account.isOffBudget
            ? [0.15, 0.65, 0.1, 0.1]
            : [0.1, 0.2, 0.53, 0.085, 0.085];

        return (
            <Box
                ref={ref}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: 1,
                    height: 1,
                    // flex: "0 0 auto",
                }}
            >
                <TransactionsLabelsRow
                    all={showAllTransactions}
                    isOnBudget={!account?.isOffBudget ?? true}
                    columnRatios={columnRatios}
                    // styleHeight={labelsHeight}
                />
                <TransactionsList
                    onRowClick={onRowClick}
                    setOnListInteraction={setOnListInteraction}
                    // selectedTransactions={selectedTransactions}
                    // setSelectedTransactions={setSelectedTransactions}
                    isSelected={isSelected}
                    isEditing={isEditing}
                    clearTransactionState={clearTransactionState}
                    account={account}
                    transactions={transactions}
                    columnRatios={columnRatios}
                    // styleTop={headerHeight + labelsHeight}
                />
            </Box>
        );
    },
);

TransactionsTable.displayName = "TransactionsTable";

export default TransactionsTable;
