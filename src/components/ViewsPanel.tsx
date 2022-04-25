import { useState } from "react";
import { Paper, Typography } from "@mui/material";
import AccountList from "./AccountList";
import ViewsList from "./ViewsList";
import AddAccountButton from "./AddAccountButton";
import NewAccountDialog from "./NewAccountDialog";

const ViewsPanel: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

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
                <AddAccountButton onClick={handleOpen} />
                <NewAccountDialog isOpen={isOpen} handleClose={handleClose} />
            </Paper>
        </>
    );
};

export default ViewsPanel;
