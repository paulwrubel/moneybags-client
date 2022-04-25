import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "data/BudgetSlice";
import metadataReducer from "data/MetadataSlice";
import { TestBudgetData } from "./TestBudgetData";

export const store = configureStore({
    reducer: {
        metadata: metadataReducer,
        budget: budgetReducer,
    },
});

export const saveTestBudgetDataToLocalStorage = () => {
    localStorage.setItem(
        "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        JSON.stringify(TestBudgetData),
    );
};

store.subscribe(() => {
    const state = store.getState();
    if (!state.metadata.saveLock) {
        if (state.metadata.budgetHeaders) {
            localStorage.setItem(
                "budgetHeaders",
                JSON.stringify(state.metadata.budgetHeaders),
            );
        }
        if (state.metadata.activeBudgetID) {
            console.log(state);
            const budgetString = JSON.stringify(state.budget);
            console.log(
                `STORING BUDGET STRING FOR ${state.metadata.activeBudgetID} | ` +
                    budgetString,
            );
            localStorage.setItem(state.metadata.activeBudgetID, budgetString);
        }
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
