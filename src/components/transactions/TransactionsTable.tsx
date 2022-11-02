import { forwardRef } from "react";

import { Box, Collapse } from "@mui/material";

import AddTransactionRow from "components/transactions/AddTransactionRow";
import TransactionsLabelsRow from "components/transactions/TransactionsLabelsRow";
import TransactionsList from "components/transactions/TransactionsList";
import { Account, Transaction } from "models/Budget";

const TransactionsTable = forwardRef<
    React.Ref<unknown>,
    {
        columnRatios: number[];
        showAllTransactions: boolean;
        isAddingTransaction: boolean;
        account?: Account;
        transactions: Transaction[];
        setIsAddingTransaction: (isAddingTransaction: boolean) => void;
        // setSelectedTransactions: (selectedTransactions: Transaction[]) => boolean;
        // setTransactionBeingEdited: (
        //     transactionBeingEdited: Transaction | null,
        // ) => void;
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
            columnRatios,
            showAllTransactions,
            isAddingTransaction,
            account,
            transactions,
            setIsAddingTransaction,
            // setSelectedTransactions,
            // setTransactionBeingEdited,
            onRowClick,
            isSelected,
            isEditing,
        },
        ref,
        // {
        //     columnRatios: number[];
        //     showAllTransactions: boolean;
        //     isAddingTransaction: boolean;
        //     account?: Account;
        //     transactions: Transaction[];
        //     setIsAddingTransaction: (isAddingTransaction: boolean) => void;
        //     // setSelectedTransactions: (selectedTransactions: Transaction[]) => boolean;
        //     // setTransactionBeingEdited: (
        //     //     transactionBeingEdited: Transaction | null,
        //     // ) => void;
        //     onRowClick: (
        //         t: Transaction,
        //         wasCheckClicked: boolean,
        //         isShiftHeld: boolean,
        //         isCtrlHeld: boolean,
        //     ) => void;
        //     isSelected: (t: Transaction) => boolean;
        //     isEditing: (t: Transaction) => boolean;
        // }
    ) => {
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
                <Collapse in={isAddingTransaction} sx={{ flex: "0 0 auto" }}>
                    <AddTransactionRow
                        account={account}
                        columnRatios={columnRatios}
                        isAddingTransaction={isAddingTransaction}
                        setIsAddingTransaction={setIsAddingTransaction}
                    />
                </Collapse>
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
