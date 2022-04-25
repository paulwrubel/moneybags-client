import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BudgetHeader } from "models/Budget";
import { TestBudgetData } from "./TestBudgetData";

export interface MetadataState {
    saveLock: boolean;
    activeBudgetID?: string;
    budgetHeaders?: BudgetHeader[];
}

const loadMetadataStateFromLocalStorage = (): MetadataState => {
    const budgetHeaders = localStorage.getItem("budgetHeaders");
    const initState: MetadataState = { saveLock: false };
    if (budgetHeaders) {
        initState.budgetHeaders = JSON.parse(budgetHeaders);
    }
    return initState;
};

export const metadataSlice = createSlice({
    name: "metadata",
    initialState: loadMetadataStateFromLocalStorage(),
    reducers: {
        saveLock: (state) => {
            console.log("SAVE LOCK");
            state.saveLock = true;
        },
        saveUnlock: (state) => {
            console.log("SAVE UNLOCK");
            state.saveLock = false;
        },
        setActiveBudgetID: (state, action: PayloadAction<string>) => {
            console.log("SETTING ACTIVE BUDGET ID | " + action.payload);
            state.activeBudgetID = action.payload;
        },
        addBudgetHeader: (state, action: PayloadAction<BudgetHeader>) => {
            if (!state.budgetHeaders) {
                state.budgetHeaders = [];
            }
            state.budgetHeaders.push(action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveLock, saveUnlock, setActiveBudgetID, addBudgetHeader } =
    metadataSlice.actions;

export default metadataSlice.reducer;
