import { createRef, forwardRef, useEffect } from "react";

import { Box, ButtonBase } from "@mui/material";

import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList } from "react-window";

import TransactionRow from "components/transactions/TransactionRow";
// import { useTransactions } from "data/Hooks";
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
        setOnListInteraction: (onListInteraction: () => void) => void;
        // selectedTransactions: Transaction[];
        // setSelectedTransactions: (arg0: Transaction[]) => void;
        isSelected: (t: Transaction) => boolean;
        isEditing: (t: Transaction) => boolean;
        clearTransactionState: (t: Transaction) => void;
        account?: Account;
        transactions: Transaction[];
        columnRatios: number[];
    }
>(
    (
        {
            onRowClick,
            setOnListInteraction,
            isSelected,
            isEditing,
            clearTransactionState,
            account,
            transactions,
            columnRatios,
        },
        ref,
    ) => {
        const getItemSize = (index: number) =>
            isEditing(transactions[index]) ? 64 : 32;

        const listRef = createRef<VariableSizeList>();

        useEffect(() => {
            setOnListInteraction(() => {
                listRef.current?.resetAfterIndex(0, true);
            });
        });

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
                        <VariableSizeList
                            ref={listRef}
                            itemCount={transactions.length}
                            // estimatedItemSize={32}
                            itemSize={getItemSize}
                            width={width}
                            height={height}
                        >
                            {({ index, style }) => {
                                const transaction = transactions[index];
                                const selected = isSelected(transaction);
                                const editing = isEditing(transaction);
                                const isExpanded = editing;
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
                                            // console.log(listRef.current);
                                            // listRef.current?.resetAfterIndex(
                                            //     0,
                                            //     true,
                                            // );

                                            // setIsSelected(transaction, !selected);
                                        }}
                                        sx={{ width: 1 }}
                                    >
                                        <TransactionRow
                                            isSelected={selected}
                                            isEditing={editing}
                                            isExpanded={isExpanded}
                                            clearTransactionState={() => {
                                                clearTransactionState(
                                                    transaction,
                                                );
                                            }}
                                            showAccount={!account}
                                            showCategory={
                                                !account?.isOffBudget ?? true
                                            }
                                            columnRatios={columnRatios}
                                            index={index}
                                            transaction={transaction}
                                        />
                                    </ButtonBase>
                                );
                            }}
                        </VariableSizeList>
                    )}
                </AutoSizer>
            </Box>
        );
    },
);

TransactionsList.displayName = "TransactionsList";

export default TransactionsList;
