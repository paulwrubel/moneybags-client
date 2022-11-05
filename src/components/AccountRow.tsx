import { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, SxProps, Typography } from "@mui/material";

import { Link, Navigate, useMatch } from "react-router-dom";

import EditAccountPopper from "components/EditAccountPopper";
import SolidSelectable from "components/solid/SolidSelectable";
import { useAccount, useTransactionsByAccountID } from "data/Hooks";
// import { Account } from "models/Budget";
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
    const account = useAccount(id);

    if (!account) {
        return <Navigate to="../accounts" />;
    }

    const match = useMatch("/:budgetID/accounts/:accountID");

    const transactions = useTransactionsByAccountID(id);
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
        <>
            <SolidSelectable
                isSelected={isSelected}
                color="primary.light"
                selectedColor="primary.dark"
                hoverColor="primary.main"
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
                                    // e.stopPropagation();
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
                    account={account}
                    isOpen={isEditAccountPopperOpen}
                    setIsOpen={setIsEditAccountPopperOpen}
                    anchorEl={editAccountPopperAnchorEl}
                    setAnchorEl={setEditAccountPopperAnchorEl}
                />
            </SolidSelectable>
        </>
    );
};

export default AccountRow;
