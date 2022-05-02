import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import { Budget } from "models/Budget";

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
                category.allocated = action.payload.value;
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

                    previousBalance: number;
                    allocated: number;
                    activity: number;
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

                    previousBalance: action.payload.previousBalance,
                    allocated: action.payload.allocated,
                    activity: action.payload.activity,
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
                        allocated: 0,
                        activity: 0,
                    },
                };
            },
        },
        addAccount: {
            reducer: (
                state: Budget | null,
                action: PayloadAction<{
                    accountID: string;
                    transactionID: string;
                    name: string;
                    initialBalance: number;
                    createdDate: number;
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
                    categoryID: "0",
                    date: action.payload.createdDate,
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
                        createdDate: Date.now(),
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
    addAccount,
} = budgetSlice.actions;

export default budgetSlice.reducer;
