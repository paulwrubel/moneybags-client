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
export const { addBudgetHeader } = metadataSlice.actions;

export default metadataSlice.reducer;
