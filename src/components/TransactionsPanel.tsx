import { useMemo, useState } from "react";

import { Box, Collapse } from "@mui/material";

import { Navigate, useParams } from "react-router-dom";

import AddTransactionRow from "components/AddTransactionRow";
import TransactionsHeader from "components/TransactionsHeader";
import TransactionsLabelsRow from "components/TransactionsLabelsRow";
import TransactionsList from "components/TransactionsList";
import { useAccount } from "data/Hooks";
import { Transaction } from "models/Budget";

const TransactionsPanel = () => {
    const accountID = useParams()?.accountID ?? "";

    const account = useAccount(accountID);

    const [isAddingTransaction, setIsAddingTransaction] = useState(false);
    const [selectedTransactions, setSelectedTransactions] = useState<
        Transaction[]
    >([]);
    const [transactionBeingEdited, setTransactionBeingEdited] =
        useState<Transaction | null>(null);

    const isSelected = (t: Transaction) =>
        selectedTransactions.some((a) => t.id === a.id);
    const isEditing = (t: Transaction) => transactionBeingEdited?.id === t.id;

    const setIsSelected = (t: Transaction, shouldBeSelected: boolean) => {
        const selected = isSelected(t);
        if (shouldBeSelected && !selected) {
            setSelectedTransactions([t, ...selectedTransactions]);
        } else if (!shouldBeSelected && selected) {
            setSelectedTransactions(
                selectedTransactions.filter((a) => t.id !== a.id),
            );
        }
    };

    const onRowClick = (
        t: Transaction,
        wasCheckClicked: boolean,
        wasShiftClicked: boolean,
    ) => {
        const currentlySelected = isSelected(t);
        const currentlyEditing = isEditing(t);

        if (currentlySelected) {
            setTransactionBeingEdited(t);
        } else {
            setTransactionBeingEdited(null);
            setIsSelected(t, true);
        }
    };

    if (accountID && !account) {
        return <Navigate to="../../accounts" />;
    }

    const showAllTransactions = !accountID;

    const columnRatios = showAllTransactions
        ? [0.18, 0.1, 0.2, 0.35, 0.17]
        : [0.1, 0.2, 0.53, 0.17];

    return (
        <Box
            sx={{
                width: 1,
                height: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
            }}
        >
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
            <Collapse in={isAddingTransaction} sx={{ flex: "0 0 auto" }}>
                <AddTransactionRow
                    account={account}
                    columnRatios={columnRatios}
                    isAddingTransaction={isAddingTransaction}
                    setIsAddingTransaction={setIsAddingTransaction}
                />
            </Collapse>
            {/* )} */}
            <TransactionsList
                onRowClick={onRowClick}
                // selectedTransactions={selectedTransactions}
                // setSelectedTransactions={setSelectedTransactions}
                isSelected={isSelected}
                // setIsSelected={setIsSelected}
                isEditing={isEditing}
                account={account}
                columnRatios={columnRatios}
                // styleTop={headerHeight + labelsHeight}
            />
        </Box>
    );
};

export default TransactionsPanel;
