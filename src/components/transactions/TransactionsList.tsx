import { forwardRef, useMemo } from "react";

import { Box, ButtonBase } from "@mui/material";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";

import TransactionRow from "components/transactions/TransactionRow";
import { useTransactions } from "data/Hooks";
import { Account, Transaction } from "models/Budget";
const TransactionsList = forwardRef<
    React.Ref<unknown>,
    {
        onRowClick: (
            t: Transaction,
            wasCheckClicked: boolean,
            isShiftClicked: boolean,
            isCtrlClicked: boolean,
        ) => void;
        // selectedTransactions: Transaction[];
        // setSelectedTransactions: (arg0: Transaction[]) => void;
        isSelected: (t: Transaction) => boolean;
        // setIsSelected: (t: Transaction, isSelected: boolean) => void;
        isEditing: (t: Transaction) => boolean;
        account?: Account;
        transactions: Transaction[];
        columnRatios: number[];
    }
>(
    (
        {
            onRowClick,
            isSelected,
            // setIsSelected,
            isEditing,
            account,
            transactions,
            columnRatios,
        },
        ref,
    ) => {
        return (
            <Box
                ref={ref}
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
                                        component={Box}
                                        style={style}
                                        disableRipple
                                        onClick={(
                                            e: React.MouseEvent<
                                                HTMLDivElement,
                                                MouseEvent
                                            >,
                                        ) => {
                                            e.stopPropagation();
                                            e.preventDefault();

                                            onRowClick(
                                                transaction,
                                                false,
                                                e.shiftKey,
                                                e.ctrlKey,
                                            );

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
    },
);

TransactionsList.displayName = "TransactionsList";

export default TransactionsList;
