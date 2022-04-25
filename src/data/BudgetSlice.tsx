import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TestBudgetData } from "./TestBudgetData";
import { CategoryGroup, Category, Budget } from "models/Budget";
import { v4 as uuid } from "uuid";

const initialState: Budget | null = null;

export const budgetSlice = createSlice({
    name: "budget",
    initialState: initialState as Budget | null,
    reducers: {
        setBudget: (state: Budget | null, action: PayloadAction<Budget>) => {
            console.log("SETTING BUDGET | " + action.payload);
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
        addAccount: {
            reducer: (
                state: Budget | null,
                action: PayloadAction<{
                    id: string;
                    name: string;
                    initialBalance: number;
                    createdDate: number;
                }>,
            ) => {
                if (!state) {
                    return;
                }
                // first, add the new account
                if (!state.accounts) {
                    state.accounts = [];
                }
                const newAccountID = uuid();
                state.accounts.push({
                    id: newAccountID,
                    name: action.payload.name,
                });
                // then, create a transaction to represent the initial balance
                if (!state.transactions) {
                    state.transactions = [];
                }
                state.transactions.push({
                    id: action.payload.id,
                    accountID: newAccountID,
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
                return {
                    payload: {
                        name,
                        initialBalance,
                        id: uuid(),
                        createdDate: new Date().getTime(),
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
export const { setBudget, setName, setAllocated, addAccount } =
    budgetSlice.actions;

export default budgetSlice.reducer;
