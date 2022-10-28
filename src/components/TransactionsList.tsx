import { Box, ButtonBase } from "@mui/material";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";

import TransactionRow from "components/TransactionRow";
import { useTransactions } from "data/Hooks";
import { Account, Transaction } from "models/Budget";

const TransactionsList = ({
    selectedTransactions,
    setSelectedTransactions,
    account,
    columnRatios,
}: // styleTop,
{
    selectedTransactions: Transaction[];
    setSelectedTransactions: (arg0: Transaction[]) => void;
    account?: Account;
    columnRatios: number[];
    // styleTop: number;
}) => {
    const allTransactions = useTransactions();

    const transactions = account
        ? allTransactions.filter(({ accountID }) => accountID === account.id)
        : allTransactions;

    const isSelected = (t: Transaction) =>
        selectedTransactions.some((a) => t.id === a.id);
    const setIsSelected = (t: Transaction, shouldBeSelected: boolean) => {
        const selected = isSelected(t);
        if (shouldBeSelected && !selected) {
            setSelectedTransactions([t, ...selectedTransactions]);
        } else if (!shouldBeSelected && selected) {
            setSelectedTransactions(
                selectedTransactions.filter((a) => t.id !== a.id),
            );
            // const selTrxCopy = new Set(selectedTransactions);
            // selTrxCopy.delete(id);
            // setSelectedTransactions(selTrxCopy);
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
                // boxSizing: "border-box",
                width: 1,
                height: 1,
                // top: styleTop,
                // display: "flex",
                // flexDirection: "column",
                // alignItems: "stretch",
            }}
        >
            <AutoSizer>
                {({ width, height }) => (
                    <FixedSizeList
                        itemCount={transactions.length}
                        itemSize={32}
                        width={width}
                        height={height}
                        // overscanCount={5}
                    >
                        {({ index, style }) => {
                            const transaction = transactions[index];
                            const selected = isSelected(transaction);
                            return (
                                <ButtonBase
                                    style={style}
                                    // key={transaction.id}
                                    disableRipple
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();

                                        setIsSelected(transaction, !selected);
                                        // console.log("clicked");
                                    }}
                                    sx={{ width: 1 }}
                                >
                                    <TransactionRow
                                        isSelected={selected}
                                        showAccount={!account}
                                        columnRatios={columnRatios}
                                        index={index}
                                        transaction={transaction}
                                    />
                                </ButtonBase>
                            );
                        }}
                    </FixedSizeList>
                )}
            </AutoSizer>

            {/* {transactions
                .slice()
                .sort((a, b) => b.timestamp - a.timestamp)
                // .reverse()
                .map((transaction, index) => {
                    const selected = isSelected(transaction);
                    return (
                        <ButtonBase
                            key={transaction.id}
                            disableRipple
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();

                                setIsSelected(transaction, !selected);
                                // console.log("clicked");
                            }}
                            sx={{ width: 1 }}
                        >
                            <TransactionRow
                                isSelected={selected}
                                showAccount={!account}
                                columnRatios={columnRatios}
                                index={index}
                                transaction={transaction}
                            />
                        </ButtonBase>
                    );
                })} */}
        </Box>
        // </Paper>
    );
};

export default TransactionsList;
