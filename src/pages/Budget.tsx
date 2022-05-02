import { useEffect, useState } from "react";

import { Grid, Stack } from "@mui/material";

import { Helmet } from "react-helmet-async";
import {
    Navigate,
    Route,
    Routes,
    useNavigate,
    useParams,
} from "react-router-dom";
import { v4 as uuid } from "uuid";

import MenuPanel from "components/MenuPanel";
import ViewsPanel from "components/ViewsPanel";
import { setBudget } from "data/BudgetSlice";
import {
    useActiveBudgetHeader,
    useAppDispatch,
    useBudgetHeaders,
} from "data/Hooks";
import {
    addBudgetHeader,
    saveLock,
    saveUnlock,
    setActiveBudgetID,
} from "data/MetadataSlice";
import type { AppDispatch } from "data/Store";
import { BudgetHeader } from "models/Budget";
import Loading from "pages/Loading";
import NotFound from "pages/NotFound";
import AccountsView from "pages/views/AccountsView";
import AllocationsView from "pages/views/AllocationsView";
import InsightsView from "pages/views/InsightsView";

function switchToBudget(header: BudgetHeader, dispatch: AppDispatch) {
    const budgetString = localStorage.getItem(header.id);

    dispatch(saveLock());
    dispatch(setActiveBudgetID(header.id));
    if (budgetString) {
        const budget = JSON.parse(budgetString);
        dispatch(setBudget(budget));
    } else {
        dispatch(setBudget({ ...header }));
    }
    dispatch(saveUnlock());
}

const Budget: React.FC<{
    shouldInitialize?: boolean;
}> = ({ shouldInitialize }) => {
    const navigate = useNavigate();

    const params = useParams();
    const budgetIDParam = params.budgetID;

    const dispatch = useAppDispatch();

    const activeHeader = useActiveBudgetHeader();
    const headers = useBudgetHeaders();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [budgetExists, setBudgetExists] = useState<boolean>(false);

    useEffect(() => {
        if (shouldInitialize) {
            const newBudgetID = uuid();
            dispatch(
                addBudgetHeader({
                    id: newBudgetID,
                    name: "Main",
                }),
            );
            navigate(`/${newBudgetID}`);
        }
    });

    useEffect(() => {
        const budgetHeader = headers.find(
            (header) => header.id === budgetIDParam,
        );
        if (budgetHeader) {
            switchToBudget(budgetHeader, dispatch);
            setBudgetExists(true);
        } else {
            setBudgetExists(false);
        }
        setIsLoading(false);
    }, [budgetIDParam]);

    if (isLoading) {
        return <Loading reason="loading budget..." />;
    }

    if (!budgetExists || !budgetIDParam) {
        return <NotFound />;
    }

    return (
        <>
            <Helmet>
                <title>{activeHeader?.name} | SolidBudget</title>
            </Helmet>
            {/* <Stack spacing={0} sx={{ height: "100vh" }}> */}
            <Routes>
                <Route index element={<Navigate to="allocations" />} />
                <Route
                    path="allocations"
                    element={
                        <Grid container sx={{ height: "100vh" }}>
                            <Grid item xs={2}>
                                <ViewsPanel />
                            </Grid>
                            <AllocationsView />
                        </Grid>
                    }
                />
                <Route
                    path="insights"
                    element={
                        <Grid container sx={{ height: "100vh" }}>
                            <Grid item xs={2}>
                                <ViewsPanel />
                            </Grid>
                            <InsightsView />
                        </Grid>
                    }
                />
                <Route
                    path="accounts"
                    element={
                        <Grid container sx={{ height: "100vh" }}>
                            <Grid item xs={2}>
                                <ViewsPanel />
                            </Grid>
                            <AccountsView />
                        </Grid>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* </Stack> */}
        </>
    );
};

export default Budget;
