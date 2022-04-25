import { Button, Typography, Stack } from "@mui/material";
import { useState } from "react";
import CategoryGroup from "./CategoryGroupRow";
import AccountRow from "./AccountRow";
import { useAppSelector, useAppDispatch } from "data/Hooks";
import { setName } from "data/BudgetSlice";
import { Account } from "models/Budget";

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
