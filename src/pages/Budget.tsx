import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Stack, Typography, Grid } from "@mui/material";
import MenuPanel from "components/MenuPanel";
import ViewsPanel from "components/ViewsPanel";
import ContextPanel from "components/ContextPanel";
import CenterPanel from "components/CenterPanel";
import { useAppDispatch } from "data/Hooks";
import { saveLock, saveUnlock, setActiveBudgetID } from "data/MetadataSlice";
import { setBudget } from "data/BudgetSlice";
import NotFound from "./NotFound";

const Budget: React.FC = () => {
    const params = useParams();

    const dispatch = useAppDispatch();

    const [budgetExists, setBudgetExists] = useState(false);

    // const activeBudgetID = useAppSelector((state) => state.core.activeBudgetID);

    useEffect(() => {
        const budgetID = params.budgetID;
        if (budgetID) {
            const budgetString = localStorage.getItem(budgetID);
            console.log("BUDGET STRING FROM COMPONENT | " + budgetString);
            if (budgetString) {
                const budget = JSON.parse(budgetString);
                console.log("BUDGET FROM COMPONENT | " + budget);
                dispatch(saveLock());
                dispatch(setActiveBudgetID(budgetID));
                dispatch(setBudget(budget));
                dispatch(saveUnlock());
                setBudgetExists(true);
            } else {
                setBudgetExists(false);
            }
        }
    });

    if (!budgetExists) {
        return <NotFound />;
    }

    return (
        <>
            <Stack spacing={0} sx={{ height: "100vh" }}>
                <MenuPanel />
                <Grid container sx={{ height: 1 }}>
                    <Grid item xs={2}>
                        <ViewsPanel />
                    </Grid>
                    <Grid item xs={8}>
                        <CenterPanel />
                    </Grid>
                    <Grid item xs={2}>
                        <ContextPanel />
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
};

export default Budget;
