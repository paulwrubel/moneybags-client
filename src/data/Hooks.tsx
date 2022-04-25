import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "data/Store";
import { Category, Account } from "models/Budget";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useBudgetHeaders = () =>
    useAppSelector((state) => state.metadata.budgetHeaders);

export const useActiveBudgetID = () =>
    useAppSelector((state) => state.metadata.activeBudgetID);

export const useAccountIDs = () =>
    useAppSelector((state) =>
        (state.budget?.accounts ?? []).map((account) => account.id),
    );

export const useActiveBudgetHeader = () =>
    useAppSelector((state) =>
        state.metadata.budgetHeaders?.find(
            (header) => header.id === state.metadata.activeBudgetID,
        ),
    );

export const useAccount = (id: string) =>
    useAppSelector(
        (state) =>
            state.budget?.accounts?.find(
                (account) => account.id === id,
            ) as Account,
    );

export const useCategories = () =>
    useAppSelector((state) => state.budget?.categories ?? []);

export const useCategoriesByGroupID = (groupID: string) =>
    useCategories().filter((category) => category.groupID === groupID);

export const useCategoryGroups = () =>
    useAppSelector((state) => state.budget?.categoryGroups ?? []);

export const useTransactions = () =>
    useAppSelector((state) => state.budget?.transactions ?? []);

export const useTransactionsByAccountID = (accountID: string) =>
    useTransactions().filter(
        (transaction) => transaction.accountID === accountID,
    );

export const useAllocatedByCategoryID = (categoryID: string) =>
    useAppSelector(
        (state) =>
            (
                (state.budget?.categories as Category[]).find(
                    (cat) => cat.id === categoryID,
                ) as Category
            ).allocated,
    );
