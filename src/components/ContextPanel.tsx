import { useState } from "react";
import { Paper, Typography } from "@mui/material";
import AccountList from "./AccountList";
import AddAccountButton from "./AddAccountButton";
import NewAccountDialog from "./NewAccountDialog";
import { useAppSelector, useCategories, useTransactions } from "data/Hooks";

const ContextPanel: React.FC = () => {
    const categories = useCategories();
    const transactions = useTransactions();

    const totalAllocated = categories.reduce(
        (total, cat) => total + cat.allocated,
        0,
    );
    const totalActivity = categories.reduce(
        (total, cat) => total + cat.activity,
        0,
    );
    const totalBalance = categories.reduce(
        (total, cat) =>
            total + cat.allocated + cat.activity + cat.previousBalance,
        0,
    );

    const totalUnallocated =
        transactions.reduce((total, trans) => total + trans.amount, 0) -
        totalAllocated;

    return (
        <Paper
            square
            elevation={0}
            sx={{ height: 1, bgcolor: "primary.light" }}
            color="blue"
        >
            <Typography>Unallocated: {totalUnallocated}</Typography>
            <Typography>Context</Typography>
            <Typography>Allocated: {totalAllocated}</Typography>
            <Typography>Activity: {totalActivity}</Typography>
            <Typography>Balance: {totalBalance}</Typography>
        </Paper>
    );
};

export default ContextPanel;
