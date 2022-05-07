import { useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

// import { useNavigate } from "react-router-dom";
// import { v4 as uuid } from "uuid";

import { setName } from "data/BudgetSlice";
import {
    useActiveBudgetHeader,
    useAppDispatch,
    useBudgetHeaders,
} from "data/Hooks";
import { setBudgetHeaderName } from "data/MetadataSlice";
import { BudgetHeader } from "models/Budget";

const BudgetSettingsDialog = ({
    isOpen,
    handleClose,
}: {
    isOpen: boolean;
    handleClose: () => void;
}) => {
    // const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const budgetHeaders = useBudgetHeaders();
    const header = useActiveBudgetHeader() as BudgetHeader;

    const [budgetName, setBudgetName] = useState(header.name);

    useEffect(() => {
        setBudgetName(header.name);
    }, [header]);

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
        setBudgetName(header.name);
        handleClose();
    };

    const handleBudgetRename = () => {
        dispatch(setName(budgetName));
        dispatch(
            setBudgetHeaderName({
                id: header.id,
                name: budgetName,
            }),
        );
        // navigate(`/${budgetID}`);
        handleInternalClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleInternalClose}>
            <DialogTitle>Budget Settings</DialogTitle>
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
                <Button disabled={!isValid} onClick={handleBudgetRename}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BudgetSettingsDialog;
