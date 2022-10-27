import { Box, ButtonBase } from "@mui/material";

import TransactionRow from "components/TransactionRow";
import { useTransactions } from "data/Hooks";
import { Account } from "models/Budget";

const TransactionsList = ({
    selectedTransactions,
    setSelectedTransactions,
    account,
    columnRatios,
}: {
    selectedTransactions: Set<string>;
    setSelectedTransactions: (arg0: Set<string>) => void;
    account?: Account;
    columnRatios: number[];
}) => {
    const allTransactions = useTransactions();

    const transactions = account
        ? allTransactions.filter(({ accountID }) => accountID === account.id)
        : allTransactions;

    const isSelected = (id: string) => selectedTransactions.has(id);
    const setIsSelected = (id: string, shouldBeSelected: boolean) => {
        if (shouldBeSelected) {
            setSelectedTransactions(new Set(selectedTransactions.add(id)));
        } else {
            const selTrxCopy = new Set(selectedTransactions);
            selTrxCopy.delete(id);
            setSelectedTransactions(selTrxCopy);
        }
        // if (isSelected(id) && !shouldBeSelected) {
        //     setSelectedTransactions([...selectedTransactions, id]);
        // } else if (!isSelected(id) && shouldBeSelected) {
        //     setSelectedTransactions(
        //         selectedTransactions.filter((a) => a !== id),
        //     );
        // }
    };

    return (
        // <Paper square elevation={0}>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
            }}
        >
            {transactions
                .slice()
                .sort((a, b) => a.timestamp - b.timestamp)
                .reverse()
                .map((transaction, index) => {
                    return (
                        <ButtonBase
                            key={transaction.id}
                            disableRipple
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();

                                setIsSelected(
                                    transaction.id,
                                    !isSelected(transaction.id),
                                );
                                // console.log("clicked");
                            }}
                            sx={{ width: 1 }}
                        >
                            <TransactionRow
                                isSelected={isSelected(transaction.id)}
                                showAccount={!account}
                                columnRatios={columnRatios}
                                index={index}
                                transaction={transaction}
                            />
                        </ButtonBase>
                    );
                })}
        </Box>
        // </Paper>
    );
};

export default TransactionsList;
