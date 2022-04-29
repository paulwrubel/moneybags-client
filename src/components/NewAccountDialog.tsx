import { useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

import { addAccount } from "data/BudgetSlice";
import { useAppDispatch } from "data/Hooks";

const NewAccountDialog: React.FC<{
    isOpen: boolean;
    handleClose: () => void;
}> = ({ isOpen, handleClose }) => {
    const [accountName, setAccountName] = useState("");
    const [accountInitialBalance, setAccountInitialBalance] = useState(0);

    const dispatch = useAppDispatch();

    const handleAccountNameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setAccountName(event.target.value);
    };
    const handleAccountInitialBalanceChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        let value = parseFloat(event.target.value);
        if (isNaN(value)) {
            value = 0;
        }
        setAccountInitialBalance(value);
    };

    const handleInternalClose = () => {
        setAccountName("");
        setAccountInitialBalance(0);
        handleClose();
    };

    const handleAddAccount = () => {
        // console.log(
        //     `Adding account ${accountName} with initial balance ${accountInitialBalance}`,
        // );
        dispatch(
            addAccount({
                name: accountName,
                initialBalance: accountInitialBalance,
            }),
        );
        handleInternalClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleInternalClose}>
            <DialogTitle>Add a New Account</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Name"
                    value={accountName}
                    onChange={handleAccountNameChange}
                    sx={{ textAlign: "left" }}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Initial Balance"
                    value={accountInitialBalance}
                    onChange={handleAccountInitialBalanceChange}
                    sx={{ textAlign: "end" }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleInternalClose}>Cancel</Button>
                <Button onClick={handleAddAccount}>Add Account</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewAccountDialog;
