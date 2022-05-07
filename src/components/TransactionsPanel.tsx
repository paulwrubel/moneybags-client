import { Navigate, useParams } from "react-router-dom";

import TransactionsHeader from "components/TransactionsHeader";
import TransactionsList from "components/TransactionsList";
import { useAccount } from "data/Hooks";

const TransactionsPanel = () => {
    const params = useParams();
    const accountIDParam = params.accountID;

    const account = useAccount(accountIDParam || "");

    if (accountIDParam && !account) {
        return <Navigate to="../../accounts" />;
    }

    return (
        <>
            <TransactionsHeader all={!accountIDParam} />
            <TransactionsList account={account} />
        </>
    );
};

export default TransactionsPanel;
