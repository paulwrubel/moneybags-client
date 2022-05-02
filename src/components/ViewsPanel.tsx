import { useState } from "react";

import { Paper, Typography } from "@mui/material";

import AccountList from "components/AccountList";
import AddAccountButton from "components/AddAccountButton";
import MenuPanel from "components/MenuPanel";
import NewAccountDialog from "components/NewAccountDialog";
import ViewsList from "components/ViewsList";

const ViewsPanel: React.FC = () => {
    const [addAccountDialogIsOpen, setAddAccountDialogIsOpen] = useState(false);

    return (
        <>
            <Paper
                square
                elevation={0}
                sx={{ height: 1, bgcolor: "primary.light" }}
            >
                <MenuPanel />
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
