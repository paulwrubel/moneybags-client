import { useMemo, useState } from "react";

import { Box, ClickAwayListener } from "@mui/material";

import dayjs from "dayjs";
import { Navigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

// import AddTransactionRow from "components/transactions/AddTransactionRow";
import TransactionsHeader from "components/transactions/TransactionsHeader";
// import TransactionsLabelsRow from "components/transactions/TransactionsLabelsRow";
// import TransactionsList from "components/transactions/TransactionsList";
import TransactionsTable from "components/transactions/TransactionsTable";
import { addTransactions } from "data/BudgetSlice";
import { useAccount, useAppDispatch, useTransactions } from "data/Hooks";
import { Transaction } from "models/Budget";
const TransactionsPanel = () => {
    const dispatch = useAppDispatch();

    const accountID = useParams()?.accountID ?? "";

    const account = useAccount(accountID);

    // const [isAddingTransaction, setIsAddingTransaction] = useState(false);

    const allTransactions = useTransactions();
    const transactions = useMemo(
        () =>
            account
                ? allTransactions.filter((t) => t.accountID === account.id)
                : allTransactions,
        [allTransactions, account, accountID],
    );

    const [transientTransactionID, setTransientTransactionID] = useState<
        string | null
    >(null);
    const transientTransaction =
        transactions.find((t) => transientTransactionID === t.id) ?? null;

    const [transactionIDBeingEdited, setTransactionIDBeingEdited] = useState<
        string | null
    >(transientTransaction?.id ?? null);
    const transactionBeingEdited =
        transactions.find((t) => transactionIDBeingEdited === t.id) ?? null;
    if (transactionBeingEdited) {
        console.log(transactionBeingEdited);
        console.log(transactionBeingEdited.id);
    }

    const [selectedTransactions, setSelectedTransactions] = useState<
        Transaction[]
    >(transientTransaction ? [transientTransaction] : []);
    const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(
        null,
    );

    const sortedTransactions = useMemo(
        () =>
            transactions.slice().sort((a, b) => {
                if (a.id === transientTransaction?.id) {
                    return -1;
                } else if (b.id === transientTransaction?.id) {
                    return 1;
                } else {
                    return b.timestamp - a.timestamp;
                }
            }),
        [transactions, transientTransaction],
    );

    if (accountID && !account) {
        return <Navigate to="../../accounts" />;
    }

    const isSelected = (t: Transaction) =>
        selectedTransactions.some((a) => t.id === a.id);
    const isEditing = (t: Transaction) => transactionBeingEdited?.id === t.id;
    // const isTransient = (t: Transaction) => transientTransaction?.id === t.id;

    // const setIsSelected = (t: Transaction, shouldBeSelected: boolean) => {
    //     const selected = isSelected(t);
    //     if (shouldBeSelected && !selected) {
    //         setSelectedTransactions([t, ...selectedTransactions]);
    //     } else if (!shouldBeSelected && selected) {
    //         setSelectedTransactions(
    //             selectedTransactions.filter((a) => t.id !== a.id),
    //         );
    //     }
    // };

    const uniq = <T,>(a: Array<T>) =>
        a.filter((e: T, i: number) => {
            return a.indexOf(e) == i;
        });

    const handleAddTransactionOnClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        event.stopPropagation();

        const newTransactionID = uuid();
        dispatch(
            addTransactions([
                {
                    id: newTransactionID,
                    accountID: account?.id ?? undefined,
                    timestamp: dayjs().startOf("day").valueOf(),
                    amount: 0,
                },
            ]),
        );
        setTransientTransactionID(newTransactionID);
        setTransactionIDBeingEdited(newTransactionID);
    };

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
                setTransactionIDBeingEdited(null);
                setLastSelectedIndex(
                    transactions.findIndex((a) => a.id === t.id),
                );
            } else {
                if (selectedTransactions.length == 1) {
                    setTransactionIDBeingEdited(t.id);
                    setSelectedTransactions([]);
                    setLastSelectedIndex(
                        transactions.findIndex((a) => a.id === t.id),
                    );
                } else {
                    setSelectedTransactions([t]);
                    setTransactionIDBeingEdited(null);
                    setLastSelectedIndex(
                        transactions.findIndex((a) => a.id === t.id),
                    );
                }
            }
        } else {
            if (isCtrlHeld) {
                setSelectedTransactions([t, ...selectedTransactions]);
                setTransactionIDBeingEdited(null);
                setLastSelectedIndex(
                    transactions.findIndex((a) => a.id === t.id),
                );
            } else {
                if (!currentlyEditing) {
                    setSelectedTransactions([t]);
                    setTransactionIDBeingEdited(null);
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
                handleAddTransaction={handleAddTransactionOnClick}
                // setTransientTransactionID={setTransientTransactionID}
                // setTransactionBeingEdited={setTransactionBeingEdited}
                // styleHeight={headerHeight}
            />
            <ClickAwayListener
                onClickAway={() => {
                    console.log("clicked away from trxs");
                    setSelectedTransactions([]);
                    setTransactionIDBeingEdited(null);
                }}
            >
                <TransactionsTable
                    // isAddingTransaction={isAddingTransaction}
                    // setIsAddingTransaction={setIsAddingTransaction}
                    transientTransactionID={transientTransactionID}
                    setTransientTransactionID={setTransientTransactionID}
                    account={account}
                    transactions={sortedTransactions}
                    onRowClick={onRowClick}
                    isSelected={isSelected}
                    isEditing={isEditing}
                />
            </ClickAwayListener>
        </Box>
    );
};

export default TransactionsPanel;
