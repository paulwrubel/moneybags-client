import { useState } from "react";

import { Collapse } from "@mui/material";

import { Navigate, useParams } from "react-router-dom";

import AddTransactionRow from "components/AddTransactionRow";
import TransactionsHeader from "components/TransactionsHeader";
import TransactionsLabelsRow from "components/TransactionsLabelsRow";
import TransactionsList from "components/TransactionsList";
import { useAccount } from "data/Hooks";

const TransactionsPanel = () => {
    const params = useParams();
    const accountIDParam = params.accountID;

    const account = useAccount(accountIDParam || "");

    if (accountIDParam && !account) {
        return <Navigate to="../../accounts" />;
    }

    const [isAddingTransaction, setIsAddingTransaction] = useState(false);

    const showAllTransactions = !accountIDParam;

    const columnRatios = showAllTransactions
        ? [0.18, 0.1, 0.2, 0.35, 0.17]
        : [0.1, 0.2, 0.53, 0.17];

    return (
        <>
            <TransactionsHeader
                setIsAddingTransaction={setIsAddingTransaction}
            />
            <TransactionsLabelsRow
                all={showAllTransactions}
                columnRatios={columnRatios}
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
            <TransactionsList account={account} columnRatios={columnRatios} />
        </>
    );
};

export default TransactionsPanel;
