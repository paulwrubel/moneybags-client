import { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Button,
    IconButton,
    Paper,
    SxProps,
    Typography,
} from "@mui/material";

import { Link, useLocation, useMatch } from "react-router-dom";

import EditAccountPopper from "components/EditAccountPopper";
import { useAccount, useTransactionsByAccountID } from "data/Hooks";
import { Account } from "models/Budget";
import { formatCurrencyCents } from "Utils";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return <Box sx={{ mx: 1, ...sx }}>{children}</Box>;
};

const AccountRow = ({ id }: { id: string }) => {
    const account = useAccount(id) as Account;

    const match = useMatch("/:budgetID/accounts/:accountID");

    // const allTransactions = useTransactions();
    const transactions = useTransactionsByAccountID(id);
    // const dispatch = useAppDispatch();

    // console.log(`AccountRow: ${id}`);
    // console.log(allTransactions);
    // console.log(transactions);

    const [balance, setBalance] = useState(0);

    const [isEditAccountPopperOpen, setIsEditAccountPopperOpen] =
        useState(false);
    const [editAccountPopperAnchorEl, setEditAccountPopperAnchorEl] =
        useState<Element | null>(null);

    useEffect(() => {
        const accBalance = transactions.reduce(
            (balance, transaction) => balance + transaction.amount,
            0,
        );
        setBalance(accBalance);
    });

    const isSelected = match?.params.accountID === id;

    return (
        // <>
        //     {envelopeStacks.envelopes.map((envelope) => (
        //         <Envelope key={envelope.id} envelopeStack={envelopeStack} />
        //     ))}
        // </>
        <>
            <Paper
                square
                elevation={0}
                sx={{
                    backgroundColor: isSelected
                        ? "primary.dark"
                        : "primary.light",
                    ":hover": {
                        backgroundColor: isSelected
                            ? "primary.dark"
                            : "primary.main",
                    },
                }}
            >
                <Button
                    disableRipple
                    to={`../accounts/${id}`}
                    component={Link}
                    sx={{
                        p: 1,
                        width: 1,
                        textTransform: "none",
                        color: "black",
                    }}
                >
                    <Box sx={{ width: 1, display: "flex" }}>
                        <Box
                            sx={{
                                width: 1,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Item sx={{ flexGrow: 1 }}>
                                <Typography sx={{ textAlign: "left" }}>
                                    {account.name}
                                </Typography>
                            </Item>
                            <Item sx={{}}>
                                <Typography sx={{ textAlign: "right" }}>
                                    {formatCurrencyCents(balance)}
                                </Typography>
                            </Item>
                        </Box>
                        <Item>
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();

                                    setIsEditAccountPopperOpen(true);
                                    setEditAccountPopperAnchorEl(
                                        e.currentTarget,
                                    );
                                    // setIsBudgetSettingsDialogOpen(true);
                                }}
                                // sx={{ color: "white" }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Item>
                    </Box>
                </Button>
                <EditAccountPopper
                    isOpen={isEditAccountPopperOpen}
                    setIsOpen={setIsEditAccountPopperOpen}
                    anchorEl={editAccountPopperAnchorEl}
                    setAnchorEl={setEditAccountPopperAnchorEl}
                />
            </Paper>
        </>
    );
};

export default AccountRow;
