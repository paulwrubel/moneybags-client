import { configureStore } from "@reduxjs/toolkit";

import budgetReducer from "data/BudgetSlice";
import coreReducer from "data/CoreSlice";
import metadataReducer from "data/MetadataSlice";
import { TestBudgetData } from "data/TestBudgetData";

const store = configureStore({
    reducer: {
        core: coreReducer,
        metadata: metadataReducer,
        budget: budgetReducer,
    },
});

const saveTestBudgetDataToLocalStorage = () => {
    localStorage.setItem(
        "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        JSON.stringify(TestBudgetData),
    );
};

store.subscribe(() => {
    const state = store.getState();
    if (!state.core.saveLock) {
        const metadataString = JSON.stringify(state.metadata);
        localStorage.setItem("metadata", metadataString);
        // if (state.metadata.budgetHeaders) {
        //     localStorage.setItem(
        //         "budgetHeaders",
        //         JSON.stringify(state.metadata.budgetHeaders),
        //     );
        // }
        if (state.core.activeBudgetID) {
            // console.log(state);
            const budgetString = JSON.stringify(state.budget);
            // console.log(
            //     `STORING BUDGET STRING FOR ${state.metadata.activeBudgetID} | ` +
            //         budgetString,
            // );
            localStorage.setItem(state.core.activeBudgetID, budgetString);
        }
    }
});

export { store, saveTestBudgetDataToLocalStorage };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
