import { useState } from "react";

import { Paper, Typography } from "@mui/material";

import AccountList from "./AccountList";
import AddAccountButton from "./AddAccountButton";
import NewAccountDialog from "./NewAccountDialog";
import ViewsList from "./ViewsList";

const ViewsPanel: React.FC = () => {
    const [addAccountDialogIsOpen, setAddAccountDialogIsOpen] = useState(false);

    //     const handleOpen = () => {
    //         setIsOpen(true);
    //     };
    //
    //     const handleClose = () => {
    //         setIsOpen(false);
    //     };

    return (
        <>
            <Paper
                square
                elevation={0}
                sx={{ height: 1, bgcolor: "primary.light" }}
            >
                <Typography>Views</Typography>
                <ViewsList />
                <Typography>Accounts</Typography>
                <AccountList />
                <AddAccountButton
                    onClick={() => {
                        setAddAccountDialogIsOpen(true);
                    }}
                />
                <NewAccountDialog
                    isOpen={addAccountDialogIsOpen}
                    handleClose={() => {
                        setAddAccountDialogIsOpen(false);
                    }}
                />
            </Paper>
        </>
    );
};

export default ViewsPanel;
