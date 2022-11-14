import { useState } from "react";

import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { Divider, Menu, MenuItem, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import ImportBudgetDialog from "components/ImportBudgetDialog";
import NewBudgetDialog from "components/NewBudgetDialog";
import { useBudgetHeaders } from "data/Hooks";

const BudgetMenu = ({
    anchorElement,
    isOpen,
    setIsOpen,
}: {
    anchorElement: HTMLElement | null;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) => {
    const [isCreateBudgetDialogOpen, setIsCreateBudgetDialogOpen] =
        useState(false);
    const [isImportBudgetDialogOpen, setIsImportBudgetDialogOpen] =
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
                    <AddCircleOutlineSharpIcon sx={{ pr: "4px" }} />
                    <Typography>New Budget</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setIsImportBudgetDialogOpen(true);
                        setIsOpen(false);
                    }}
                >
                    <AddCircleOutlineSharpIcon sx={{ pr: "4px" }} />
                    <Typography>Import Budget</Typography>
                </MenuItem>
            </Menu>
            <NewBudgetDialog
                isOpen={isCreateBudgetDialogOpen}
                handleClose={() => {
                    setIsCreateBudgetDialogOpen(false);
                }}
            />
            <ImportBudgetDialog
                isOpen={isImportBudgetDialogOpen}
                handleClose={() => {
                    setIsImportBudgetDialogOpen(false);
                }}
            />
        </>
    );
};

export default BudgetMenu;
