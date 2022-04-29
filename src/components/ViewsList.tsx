import { useState } from "react";

import { Button, Stack, Typography } from "@mui/material";

import { setName } from "data/BudgetSlice";
import { useAppDispatch, useAppSelector } from "data/Hooks";
import { Account } from "models/Budget";

import AccountRow from "./AccountRow";
import CategoryGroup from "./CategoryGroupRow";

const ViewsList: React.FC = () => {
    // const accountIDs = useAppSelector((state) =>
    //     (state.budget.accounts ?? []).map((account) => account.id),
    // );

    return (
        <>
            <Stack direction="column">
                <Button sx={{ color: "black" }}>Allocations</Button>
                <Button sx={{ color: "black" }}>Insights</Button>
                <Button sx={{ color: "black" }}>Accounts</Button>
            </Stack>
        </>
    );
};

export default ViewsList;
