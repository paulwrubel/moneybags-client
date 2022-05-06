import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CoreState {
    saveLock: boolean;
    activeBudgetID?: string;
    selectedMonth?: number;
}

const InitialState: CoreState = {
    saveLock: false,
};

export const coreSlice = createSlice({
    name: "core",
    initialState: InitialState,
    reducers: {
        saveLock: (state) => {
            state.saveLock = true;
        },
        saveUnlock: (state) => {
            state.saveLock = false;
        },
        setActiveBudgetID: (state, action: PayloadAction<string>) => {
            state.activeBudgetID = action.payload;
        },
        setSelectedMonth: (state, action: PayloadAction<number>) => {
            state.selectedMonth = action.payload;
        },
    },
});

export type { CoreState };

// Action creators are generated for each case reducer function
export const { saveLock, saveUnlock, setActiveBudgetID, setSelectedMonth } =
    coreSlice.actions;

export default coreSlice.reducer;
