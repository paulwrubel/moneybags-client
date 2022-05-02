import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { useActiveBudgetID, useBudgetHeaders } from "data/Hooks";
import Budget from "pages/Budget";
import NotFound from "pages/NotFound";

const Router: React.FC = () => {
    const activeBudgetID = useActiveBudgetID();
    const budgetHeaders = useBudgetHeaders();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        activeBudgetID ? (
                            <Navigate to={`/${activeBudgetID}`} />
                        ) : budgetHeaders && budgetHeaders.length !== 0 ? (
                            <Navigate
                                to={`/${
                                    budgetHeaders.reduce((a, b) =>
                                        a.accessedAt > b.accessedAt ? a : b,
                                    ).id
                                }`}
                            />
                        ) : (
                            <Budget shouldInitialize />
                        )
                    }
                ></Route>
                <Route path="/:budgetID/*" element={<Budget />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
