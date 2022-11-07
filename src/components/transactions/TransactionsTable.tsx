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
        },
        ref,
    ) => {
        const showAllTransactions = !account;

        const columnRatios = showAllTransactions
            ? [0.18, 0.1, 0.2, 0.35, 0.17]
            : [0.1, 0.2, 0.53, 0.17];

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
                    columnRatios={columnRatios}
                    // styleHeight={labelsHeight}
                />
                {/* {isAddingTransaction && ( */}
                {/* <Collapse in={isAddingTransaction} sx={{ flex: "0 0 auto" }}>
                    <AddTransactionRow
                        account={account}
                        columnRatios={columnRatios}
                        isAddingTransaction={isAddingTransaction}
                        setIsAddingTransaction={setIsAddingTransaction}
                    />
                </Collapse> */}
                {/* )} */}
                {/* <ClickAwayListener
                onClickAway={() => {
                    console.log("clicked away from trxs");
                    setSelectedTransactions([]);
                    setTransactionBeingEdited(null);
                }}
            > */}
                {/* <div> */}
                <TransactionsList
                    onRowClick={onRowClick}
                    // selectedTransactions={selectedTransactions}
                    // setSelectedTransactions={setSelectedTransactions}
                    isSelected={isSelected}
                    // setIsSelected={setIsSelected}
                    isEditing={isEditing}
                    account={account}
                    transactions={transactions}
                    columnRatios={columnRatios}
                    // styleTop={headerHeight + labelsHeight}
                />
                {/* </div> */}
                {/* </ClickAwayListener> */}
            </Box>
        );
    },
);

TransactionsTable.displayName = "TransactionsTable";

export default TransactionsTable;
