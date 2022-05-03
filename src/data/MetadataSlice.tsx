import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

import { BudgetHeader } from "models/Budget";

interface MetadataState {
    saveLock: boolean;
    activeBudgetID?: string;
    budgetHeaders?: BudgetHeader[];
}

const loadMetadataStateFromLocalStorage = (): MetadataState => {
    const budgetHeaders = localStorage.getItem("budgetHeaders");
    const initState: MetadataState = {
        saveLock: false,
    };
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
            state.saveLock = true;
        },
        saveUnlock: (state) => {
            state.saveLock = false;
        },
        setActiveBudgetID: (state, action: PayloadAction<string>) => {
            state.activeBudgetID = action.payload;
        },
        addBudgetHeader: {
            reducer: (state, action: PayloadAction<BudgetHeader>) => {
                if (!state.budgetHeaders) {
                    state.budgetHeaders = [];
                }
                state.budgetHeaders.push(action.payload);
            },
            prepare: ({ id, name }: { id?: string; name: string }) => {
                if (!id) {
                    id = uuid();
                }
                return {
                    payload: {
                        id: id,
                        name: name,
                        createdAt: dayjs().valueOf(),
                        modifiedAt: dayjs().valueOf(),
                        accessedAt: dayjs().valueOf(),
                    },
                };
            },
        },
    },
});

export type { MetadataState };

// Action creators are generated for each case reducer function
export const { saveLock, saveUnlock, setActiveBudgetID, addBudgetHeader } =
    metadataSlice.actions;

export default metadataSlice.reducer;
