import { useState } from "react";

import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { Divider, Menu, MenuItem, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useBudgetHeaders } from "data/Hooks";

import NewBudgetDialog from "./NewBudgetDialog";

const BudgetMenu: React.FC<{
    anchorElement: HTMLElement | null;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}> = ({ anchorElement, isOpen, setIsOpen }) => {
    const [isCreateBudgetDialogOpen, setIsCreateBudgetDialogOpen] =
        useState(false);

    const budgetHeaders = useBudgetHeaders();

    const navigate = useNavigate();

    return (
        <>
            <Menu
                open={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                anchorEl={anchorElement}
            >
                {budgetHeaders.map(({ id, name }) => (
                    <MenuItem
                        onClick={() => {
                            //switch to budget
                            navigate(`/${id}`);
                            setIsOpen(false);
                        }}
                        key={id}
                    >
                        <Typography>{name}</Typography>
                    </MenuItem>
                ))}
                <Divider />
                <MenuItem
                    onClick={() => {
                        setIsCreateBudgetDialogOpen(true);
                        setIsOpen(false);
                    }}
                >
                    <AddCircleOutlineSharpIcon />
                    <Typography>New Budget</Typography>
                </MenuItem>
            </Menu>
            <NewBudgetDialog
                isOpen={isCreateBudgetDialogOpen}
                handleClose={() => {
                    setIsCreateBudgetDialogOpen(false);
                }}
            />
        </>
    );
};

export default BudgetMenu;
