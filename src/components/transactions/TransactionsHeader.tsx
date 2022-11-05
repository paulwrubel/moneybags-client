import { useState } from "react";

import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { Box, Button, Paper, SxProps } from "@mui/material";

import EditTransactionsPopper from "components/transactions/EditTransactionsPopper";
import { Transaction } from "models/Budget";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return <Box sx={{ mx: 1, ...sx }}>{children}</Box>;
};

const TransactionsHeader = ({
    selectedTransactions,
    setSelectedTransactions,
    setIsAddingTransaction,
}: {
    selectedTransactions: Transaction[];
    setSelectedTransactions: (arg0: Transaction[]) => void;
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [isEditTransactionsPopperOpen, setIsEditTransactionsPopperOpen] =
        useState(false);
    const [editTransactionsPopperAnchorEl, setEditTransactionsPopperAnchorEl] =
        useState<Element | null>(null);

    return (
        <Paper
            square
            elevation={0}
            sx={{
                flex: "0 0 auto",
                boxSizing: "border-box",
                width: 1,
                p: 1,
                backgroundColor: "primary.light",
                height: "64px",
                color: "black",
            }}
        >
            <Box
                sx={{
                    height: 1,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Item sx={{}}>
                    <Button
                        // variant="outlined"
                        onClick={() => {
                            setIsAddingTransaction(true);
                        }}
                        size="small"
                        startIcon={<AddCircleOutlineSharpIcon />}
                        sx={{
                            textTransform: "none",
                            color: "black",
                            borderColor: "black",
                            ":hover": {
                                backgroundColor: "primary.main",
                                borderColor: "black",
                            },
                        }}
                    >
                        Add
                    </Button>
                </Item>
                <Item sx={{}}>
                    <Button
                        // variant="outlined"
                        onClick={(
                            event: React.MouseEvent<HTMLButtonElement>,
                        ) => {
                            setIsEditTransactionsPopperOpen(true);
                            setEditTransactionsPopperAnchorEl(
                                event.currentTarget,
                            );
                        }}
                        size="small"
                        startIcon={<EditSharpIcon />}
                        sx={{
                            textTransform: "none",
                            color: "black",
                            borderColor: "black",
                            ":hover": {
                                backgroundColor: "primary.main",
                                borderColor: "black",
                            },
                        }}
                    >
                        Edit
                    </Button>
                    <EditTransactionsPopper
                        selectedTransactions={selectedTransactions}
                        setSelectedTransactions={setSelectedTransactions}
                        isOpen={isEditTransactionsPopperOpen}
                        setIsOpen={setIsEditTransactionsPopperOpen}
                        anchorEl={editTransactionsPopperAnchorEl}
                        setAnchorEl={setEditTransactionsPopperAnchorEl}
                    />
                </Item>
            </Box>
        </Paper>
    );
};

export default TransactionsHeader;
