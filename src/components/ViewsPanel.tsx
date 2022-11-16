import { useState } from "react";

import { Box, Divider, Paper, SxProps } from "@mui/material";

import AccountList from "components/AccountList";
import AddAccountButton from "components/AddAccountButton";
import InfoRow from "components/InfoRow";
import MenuPanel from "components/MenuPanel";
import NewAccountDialog from "components/NewAccountDialog";
import ViewsList from "components/ViewsList";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return <Box sx={{ my: 1, ...sx }}>{children}</Box>;
};

const ViewsPanel = () => {
    const REACT_APP_SB_VERSION =
        process.env.REACT_APP_SB_VERSION ?? "__UNKNOWN__";

    const [addAccountDialogIsOpen, setAddAccountDialogIsOpen] = useState(false);

    return (
        <>
            <Paper
                square
                elevation={0}
                sx={{
                    height: 1,
                    maxHeight: "100vh",
                    bgcolor: "primary.light",
                    overflow: "auto",
                }}
            >
                <Box
                    sx={{
                        width: 1,
                        height: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            width: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Item sx={{ width: 1, my: 0 }}>
                            <MenuPanel />
                        </Item>
                        <Item sx={{ width: 1 }}>
                            <ViewsList />
                        </Item>
                        <Divider
                            orientation="horizontal"
                            variant="middle"
                            sx={{ width: 0.9 }}
                        />
                        <Item sx={{ width: 1 }}>
                            <AccountList />
                        </Item>
                        <Item
                            sx={{
                                width: 1,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
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
                        </Item>
                    </Box>
                    <Box sx={{ width: 1 }}>
                        <InfoRow version={REACT_APP_SB_VERSION} />
                    </Box>
                </Box>
            </Paper>
        </>
    );
};

export default ViewsPanel;
