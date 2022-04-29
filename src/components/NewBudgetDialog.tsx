import { useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { useAppDispatch, useBudgetHeaders } from "data/Hooks";
import { addBudgetHeader } from "data/MetadataSlice";

const NewBudgetDialog: React.FC<{
    isOpen: boolean;
    handleClose: () => void;
}> = ({ isOpen, handleClose }) => {
    const navigate = useNavigate();

    const [budgetName, setBudgetName] = useState("");
    const dispatch = useAppDispatch();
    const budgetHeaders = useBudgetHeaders();

    const isValid =
        budgetName.length > 0 &&
        budgetName.length < 100 &&
        !budgetHeaders.some((header) => header.name === budgetName);

    const handleBudgetNameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setBudgetName(event.target.value);
    };

    const handleInternalClose = () => {
        setBudgetName("");
        handleClose();
    };

    const handleAddBudget = () => {
        // console.log(`Adding budget ${budgetName}`);
        const budgetID = uuid();
        dispatch(
            addBudgetHeader({
                id: budgetID,
                name: budgetName,
            }),
        );
        navigate(`/${budgetID}`);
        handleInternalClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleInternalClose}>
            <DialogTitle>Create a New Budget</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Name"
                    value={budgetName}
                    onChange={handleBudgetNameChange}
                    sx={{ textAlign: "left" }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleInternalClose}>Cancel</Button>
                <Button disabled={!isValid} onClick={handleAddBudget}>
                    Create Budget
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewBudgetDialog;
