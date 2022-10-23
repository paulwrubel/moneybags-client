import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

import { Budget, Category } from "models/Budget";

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
                    timestamp: action.payload.createdTimestamp,
                    amount: action.payload.initialBalance,
                });
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
} = budgetSlice.actions;

export default budgetSlice.reducer;
