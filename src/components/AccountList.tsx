import { Typography } from "@mui/material";
import { useState } from "react";
import CategoryGroup from "./CategoryGroupRow";
import AccountRow from "./AccountRow";
import { useAppSelector, useAppDispatch, useAccountIDs } from "data/Hooks";
import { setName } from "data/BudgetSlice";
import { Account } from "models/Budget";

const AccountList: React.FC = () => {
    const accountIDs = useAccountIDs();

    return (
        <>
            {accountIDs.map((id) => (
                <AccountRow key={id} id={id} />
            ))}
        </>
    );
};

export default AccountList;
