import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

import { BudgetHeader } from "models/Budget";

interface MetadataState {
    budgetHeaders: BudgetHeader[];
}

const loadMetadataStateFromLocalStorage = (): MetadataState => {
    const metadataString = localStorage.getItem("metadata");
    let initState: MetadataState = { budgetHeaders: [] };
    if (metadataString) {
        initState = JSON.parse(metadataString);
    }
    return initState;
};

export const metadataSlice = createSlice({
    name: "metadata",
    initialState: loadMetadataStateFromLocalStorage(),
    reducers: {
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
                const currentTime = dayjs().valueOf();
                return {
                    payload: {
                        id: id,
                        name: name,
                        createdAt: currentTime,
                        modifiedAt: currentTime,
                        accessedAt: currentTime,
                    },
                };
            },
        },
        setBudgetHeaderName: (
            state,
            action: PayloadAction<{ id: string; name: string }>,
        ) => {
            (
                state.budgetHeaders.find(
                    ({ id }) => id === action.payload.id,
                ) as BudgetHeader
            ).name = action.payload.name;
        },
    },
});

export type { MetadataState };

// Action creators are generated for each case reducer function
export const { addBudgetHeader, setBudgetHeaderName } = metadataSlice.actions;

export default metadataSlice.reducer;
