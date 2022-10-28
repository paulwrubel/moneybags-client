import { useState } from "react";

import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { Box, Button, Paper, SxProps } from "@mui/material";

import EditTransactionsPopper from "components/EditTransactionsPopper";
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
}: // styleHeight,
{
    selectedTransactions: Transaction[];
    setSelectedTransactions: (arg0: Transaction[]) => void;
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
    // styleHeight: number;
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
                boxSizing: "border-box",
                width: 1,
                p: 1,
                backgroundColor: "primary.light",
                height: 64,
                color: "black",
                // position: "sticky",
                // zIndex: 0,
                top: 0,
                // position: "-webkit-sticky",
            }}
        >
            <Box
                sx={{
                    // boxSizing: "border-box",
                    // width: 1,
                    height: 1,
                    // minHeight: "inherit",
                    display: "flex",
                    // flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "space-between",
                }}
            >
                <Item sx={{}}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setIsAddingTransaction(true);
                        }}
                        size="small"
                        startIcon={<AddCircleOutlineSharpIcon />}
                        sx={{
                            textTransform: "none",
                            color: "white",
                            // backgroundColor: "primary.main",
                            borderColor: "white",
                            ":hover": {
                                // color: "primary.dark",
                                // borderColor: "primary.dark",
                                backgroundColor: "primary.main",
                                borderColor: "white",
                            },
                        }}
                    >
                        Add
                    </Button>
                </Item>
                <Item sx={{}}>
                    <Button
                        variant="outlined"
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
                            color: "white",
                            // backgroundColor: "primary.main",
                            borderColor: "white",
                            ":hover": {
                                // color: "primary.dark",
                                // borderColor: "primary.dark",
                                backgroundColor: "primary.main",
                                borderColor: "white",
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
