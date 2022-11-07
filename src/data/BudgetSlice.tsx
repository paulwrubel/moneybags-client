import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

import { Account, Budget, Category } from "models/Budget";

const initialState: Budget | null = null;

export const budgetSlice = createSlice({
    name: "budget",
    initialState: initialState as Budget | null,
    reducers: {
        setBudget: (state: Budget | null, action: PayloadAction<Budget>) => {
            // console.log("SETTING BUDGET | " + action.payload);
            return action.payload;
        },
        setName: (state: Budget | null, action: PayloadAction<string>) => {
            if (!state) {
                return;
            }
            state.name = action.payload;
        },
        setAllocated: (
            state: Budget | null,
            action: PayloadAction<{
                id: string;
                month: number;
                value: number;
            }>,
        ) => {
            if (!state) {
                return;
            }
            if (!state.categories) {
                state.categories = [];
            }
            const category = state.categories.find(
                (cat) => cat.id === action.payload.id,
            );
            if (category) {
                const index = category.allocations.findIndex(
                    ({ month }) => month === action.payload.month,
                );
                index === -1
                    ? category.allocations.push({
                          month: action.payload.month,
                          amount: action.payload.value,
                      })
                    : (category.allocations[index].amount =
                          action.payload.value);
            }
        },
        addCategoryGroup: {
            reducer: (
                state: Budget | null,
                action: PayloadAction<{
                    id: string;
                    name: string;
                    sort: number;
                }>,
            ) => {
                if (!state) {
                    return;
                }
                if (!state.categoryGroups) {
                    state.categoryGroups = [];
                }
                state.categoryGroups.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    sort: action.payload.sort,
                });
            },
            prepare: ({ name, sort }: { name: string; sort: number }) => {
                return {
                    payload: {
                        id: uuid(),
                        name,
                        sort,
                    },
                };
            },
        },
        addCategory: {
            reducer: (
                state: Budget | null,
                action: PayloadAction<{
                    id: string;
                    groupID: string;
                    name: string;
                    sort: number;

                    allocations: { month: number; amount: number }[];
                }>,
            ) => {
                if (!state || !state.categoryGroups) {
                    return;
                }
                if (!state.categories) {
                    state.categories = [];
                }
                state.categories.push({
                    id: action.payload.id,
                    groupID: action.payload.groupID,
                    name: action.payload.name,
                    sort: action.payload.sort,

                    allocations: action.payload.allocations,
                });
            },
            prepare: ({
                groupID,
                name,
                sort,
            }: {
                groupID: string;
                name: string;
                sort: number;
            }) => {
                return {
                    payload: {
                        id: uuid(),
                        groupID,
                        name,
                        sort,

                        previousBalance: 0,
                        allocations: [],
                        activity: 0,
                    },
                };
            },
        },
        setCategoryName: (
            state: Budget | null,
            action: PayloadAction<{
                id: string;
                name: string;
            }>,
        ) => {
            if (!state || !state.categories) {
                return;
            }
            (
                state.categories.find(
                    (cat) => cat.id === action.payload.id,
                ) as Category
            ).name = action.payload.name;
        },
        addAccount: {
            reducer: (
                state: Budget | null,
                action: PayloadAction<{
                    accountID: string;
                    transactionID: string;
                    name: string;
                    initialBalance: number;
                    createdTimestamp: number;
                }>,
            ) => {
                console.log(action.payload);
                if (!state) {
                    return;
                }
                // first, add the new account
                if (!state.accounts) {
                    state.accounts = [];
                }
                state.accounts.push({
                    id: action.payload.accountID,
                    name: action.payload.name,
                });
                // then, create a transaction to represent the initial balance
                if (!state.transactions) {
                    state.transactions = [];
                }
                state.transactions.push({
                    id: action.payload.transactionID,
                    accountID: action.payload.accountID,
                    categoryID: "__c_id_0__",
                    timestamp: dayjs(action.payload.createdTimestamp)
                        .startOf("day")
                        .valueOf(),
                    amount: action.payload.initialBalance,
                });

                // emergency remedy
                // state.transactions = state.transactions.filter((t) => {
                //     return state.accounts?.some((a) => t.accountID === a.id);
                // });
            },
            prepare: ({
                name,
                initialBalance,
            }: {
                name: string;
                initialBalance: number;
            }) => {
                console.log(initialBalance);
                return {
                    payload: {
                        name,
                        initialBalance,
                        accountID: uuid(),
                        transactionID: uuid(),
                        createdTimestamp: dayjs().valueOf(),
                    },
                };
            },
        },
        updateAccount: (
            state: Budget | null,
            action: PayloadAction<Account>,
        ) => {
            if (!state || !state.accounts) {
                return;
            }
            state.accounts = state.accounts.filter(
                (a) => a.id !== action.payload.id,
            );
            state.accounts.push(action.payload);
        },
        removeAccount: (
            state: Budget | null,
            action: PayloadAction<string>,
        ) => {
            if (!state || !state.accounts || !state.transactions) {
                return;
            }
            // remove the account, if it exists
            state.transactions = state.transactions.filter(
                (t) => t.accountID !== action.payload,
            );
            state.accounts = state.accounts.filter(
                (a) => a.id !== action.payload,
            );
        },
        addTransactions: {
            reducer: (
                state: Budget | null,
                action: PayloadAction<
                    {
                        id: string;
                        accountID?: string;
                        timestamp: number;
                        categoryID?: string;
                        note?: string;
                        amount: number;
                    }[]
                >,
            ) => {
                console.log(action.payload);
                if (!state) {
                    return;
                }
                // check if we need to create the transactions list
                if (!state.transactions) {
                    state.transactions = [];
                }
                // then, create the new transactions
                state.transactions = state.transactions.concat(action.payload);

                // if (action.payload.idsCallback) {
                //     action.payload.idsCallback(
                //         action.payload.transactions.map((t) => t.id),
                //     );
                // }

                //     id: action.payload.id,
                //     accountID: action.payload.accountID,
                //     categoryID: action.payload.categoryID,
                //     timestamp: action.payload.timestamp,
                //     note: action.payload.note,
                //     amount: action.payload.amount,
                // });
                // state.transactions.push({
                //     id: action.payload.id,
                //     accountID: action.payload.accountID,
                //     categoryID: action.payload.categoryID,
                //     timestamp: action.payload.timestamp,
                //     note: action.payload.note,
                //     amount: action.payload.amount,
                // });
            },
            prepare: (
                transactionsInfo: {
                    id?: string;
                    accountID?: string;
                    timestamp: number;
                    categoryID?: string;
                    note?: string;
                    amount: number;
                }[],
            ) => ({
                payload: transactionsInfo.map((tInfo) => ({
                    id: tInfo.id ?? uuid(),
                    accountID: tInfo.accountID,
                    categoryID: tInfo.categoryID,
                    timestamp: tInfo.timestamp,
                    note: tInfo.note,
                    amount: tInfo.amount,
                })),
            }),
        },
        removeTransactions: (
            state: Budget | null,
            action: PayloadAction<string[]>,
        ) => {
            // console.log(action.payload);
            if (!state || !state.transactions) {
                return;
            }
            // remove the transaction, if it exists
            state.transactions = state.transactions.filter(
                (t) => !action.payload.includes(t.id),
            );
        },
    },
});

// export const useActiveBudgetBudget = () => {
//     localStorage;
// };

// Action creators are generated for each case reducer function
export const {
    setBudget,
    setName,
    setAllocated,
    addCategory,
    addCategoryGroup,
    setCategoryName,
    addAccount,
    updateAccount,
    removeAccount,
    addTransactions,
    removeTransactions,
} = budgetSlice.actions;

export default budgetSlice.reducer;
