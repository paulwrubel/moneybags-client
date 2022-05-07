import { useState } from "react";

import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { Divider, Menu, MenuItem, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import NewBudgetDialog from "components/NewBudgetDialog";
import { useBudgetHeaders } from "data/Hooks";

const BudgetMenu: React.FC<{
    anchorElement: HTMLElement | null;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}> = ({ anchorElement, isOpen, setIsOpen }) => {
    const [isCreateBudgetDialogOpen, setIsCreateBudgetDialogOpen] =
        useState(false);

    const budgetHeaders = useBudgetHeaders();

    // const navigate = useNavigate();

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
                            // navigate(`/${id}`);
                            setIsOpen(false);
                        }}
                        to={`/${id}`}
                        component={Link}
                        key={id}
                        sx={{ color: "black" }}
                    >
                        {/* <Box
                            sx={{
                                width: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        > */}
                        <Typography>{name}</Typography>
                        {/* </Box> */}
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
