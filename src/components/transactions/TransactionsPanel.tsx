import { useMemo, useState } from "react";

import { Box, ClickAwayListener, Collapse } from "@mui/material";

import { Navigate, useParams } from "react-router-dom";

import AddTransactionRow from "components/transactions/AddTransactionRow";
import TransactionsHeader from "components/transactions/TransactionsHeader";
import TransactionsLabelsRow from "components/transactions/TransactionsLabelsRow";
import TransactionsList from "components/transactions/TransactionsList";
import TransactionsTable from "components/transactions/TransactionsTable";
import { useAccount, useTransactions } from "data/Hooks";
import { Transaction } from "models/Budget";

const TransactionsPanel = () => {
    const accountID = useParams()?.accountID ?? "";

    const account = useAccount(accountID);
    const allTransactions = useTransactions();
    const transactions = useMemo(() => {
        const transactionsPreSort = account
            ? allTransactions.filter((t) => t.accountID === account.id)
            : allTransactions;

        // console.log(transactionsPreSort);

        return transactionsPreSort
            .slice()
            .sort((a, b) => b.timestamp - a.timestamp);
    }, [allTransactions, account, accountID]);

    const [isAddingTransaction, setIsAddingTransaction] = useState(false);
    const [selectedTransactions, setSelectedTransactions] = useState<
        Transaction[]
    >([]);
    const [transactionBeingEdited, setTransactionBeingEdited] =
        useState<Transaction | null>(null);
    const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(
        null,
    );

    if (accountID && !account) {
        return <Navigate to="../../accounts" />;
    }

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

    const uniq = <T,>(a: Array<T>) =>
        a.filter((e: T, i: number) => {
            return a.indexOf(e) == i;
        });

    const onRowClick = (
        t: Transaction,
        wasCheckClicked: boolean,
        isShiftHeld: boolean,
        isCtrlHeld: boolean,
        // eslint-disable-next-line sonarjs/cognitive-complexity
    ) => {
        const currentlySelected = isSelected(t);
        const currentlyEditing = isEditing(t);

        if (isShiftHeld) {
            const curIndex = transactions.findIndex((a) => a.id === t.id);
            const transactionsToSelect = transactions.slice(
                Math.min(curIndex, lastSelectedIndex ?? curIndex),
                Math.max(curIndex, lastSelectedIndex ?? curIndex) + 1,
            );
            setSelectedTransactions(
                uniq([...selectedTransactions, ...transactionsToSelect]),
            );
            return;
        }

        if (currentlySelected) {
            if (isCtrlHeld) {
                setSelectedTransactions(
                    selectedTransactions.filter((a) => a.id !== t.id),
                );
                setTransactionBeingEdited(null);
                setLastSelectedIndex(
                    transactions.findIndex((a) => a.id === t.id),
                );
            } else {
                if (selectedTransactions.length == 1) {
                    setTransactionBeingEdited(t);
                    setSelectedTransactions([]);
                    setLastSelectedIndex(
                        transactions.findIndex((a) => a.id === t.id),
                    );
                } else {
                    setSelectedTransactions([t]);
                    setTransactionBeingEdited(null);
                    setLastSelectedIndex(
                        transactions.findIndex((a) => a.id === t.id),
                    );
                }
            }
        } else {
            if (isCtrlHeld) {
                setSelectedTransactions([t, ...selectedTransactions]);
                setTransactionBeingEdited(null);
                setLastSelectedIndex(
                    transactions.findIndex((a) => a.id === t.id),
                );
            } else {
                if (!currentlyEditing) {
                    setSelectedTransactions([t]);
                    setTransactionBeingEdited(null);
                    setLastSelectedIndex(
                        transactions.findIndex((a) => a.id === t.id),
                    );
                }
            }
        }
    };

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
            <ClickAwayListener
                onClickAway={() => {
                    console.log("clicked away from trxs");
                    setSelectedTransactions([]);
                    setTransactionBeingEdited(null);
                }}
            >
                <TransactionsTable
                    isAddingTransaction={isAddingTransaction}
                    setIsAddingTransaction={setIsAddingTransaction}
                    account={account}
                    transactions={transactions}
                    onRowClick={onRowClick}
                    isSelected={isSelected}
                    isEditing={isEditing}
                />
            </ClickAwayListener>
        </Box>
    );
};

export default TransactionsPanel;
