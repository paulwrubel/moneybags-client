import Budget from "models/Budget";
import { createContext, useContext, useState } from "react";
import { TestBudgetData } from "./TestBudgetData";

interface DataContext {
    data: Budget;
}

const Data = createContext<DataContext | undefined>(undefined);

export const useData: () => DataContext = () => {
    const a = useContext(Data);
    if (!a) {
        throw new Error("useData must be used within a DataProvider");
    }
    return a;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <Data.Provider
            value={{
                data: TestBudgetData,
            }}
        >
            {children}
        </Data.Provider>
    );
};
