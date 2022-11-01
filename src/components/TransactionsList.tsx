import { useEffect, useMemo, useRef, useState } from "react";

import { Box, ButtonBase } from "@mui/material";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";

import TransactionRow from "components/TransactionRow";
import { useTransactions } from "data/Hooks";
import { Account, Transaction } from "models/Budget";
const TransactionsList = ({
    onRowClick,
    isSelected,
    // setIsSelected,
    isEditing,
    account,
    columnRatios,
}: // styleTop,
{
    onRowClick: (
        t: Transaction,
        wasCheckClicked: boolean,
        wasShiftClicked: boolean,
    ) => void;
    // selectedTransactions: Transaction[];
    // setSelectedTransactions: (arg0: Transaction[]) => void;
    isSelected: (t: Transaction) => boolean;
    // setIsSelected: (t: Transaction, isSelected: boolean) => void;
    isEditing: (t: Transaction) => boolean;
    account?: Account;
    columnRatios: number[];
}) => {
    const allTransactions = useTransactions();

    const transactions = useMemo(() => {
        const transactionsPreSort = account
            ? allTransactions.filter(
                  ({ accountID }) => accountID === account.id,
              )
            : allTransactions;

        return transactionsPreSort
            .slice()
            .sort((a, b) => b.timestamp - a.timestamp);
    }, [allTransactions, account]);

    return (
        <Box
            sx={{
                flex: "1 1 auto",
                overflow: "hidden",
            }}
        >
            <AutoSizer>
                {({ width, height }) => (
                    <FixedSizeList
                        itemCount={transactions.length}
                        itemSize={32}
                        width={width}
                        height={height}
                    >
                        {({ index, style }) => {
                            const transaction = transactions[index];
                            const selected = isSelected(transaction);
                            const editing = isEditing(transaction);
                            return (
                                <ButtonBase
                                    style={style}
                                    disableRipple
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();

                                        onRowClick(transaction, false, false);

                                        // setIsSelected(transaction, !selected);
                                    }}
                                    sx={{ width: 1 }}
                                >
                                    <TransactionRow
                                        isSelected={selected}
                                        isEditing={editing}
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
        </Box>
    );
};

export default TransactionsList;
