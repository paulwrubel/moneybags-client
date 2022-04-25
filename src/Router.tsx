import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
// import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
// import Login from "./pages/Login";
import Home from "pages/Home";
import Budget from "pages/Budget";
import CreateBudget from "pages/CreateBudget";
import { useActiveBudgetID, useBudgetHeaders } from "data/Hooks";
// import About from "pages/About";
// import CreateAccount from "pages/CreateAccount";
// import RequireAuth from "auth/RequireAuth";

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
                        ) : budgetHeaders ? (
                            <Navigate
                                to={`/${
                                    budgetHeaders.reduce((a, b) =>
                                        a.accessedAt > b.accessedAt ? a : b,
                                    ).id
                                }`}
                            />
                        ) : (
                            <Navigate to="/create-budget" />
                        )
                    }
                ></Route>
                <Route path="/:budgetID" element={<Budget />} />
                <Route path="/create-budget" element={<CreateBudget />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
