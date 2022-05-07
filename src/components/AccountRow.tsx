import { useEffect, useState } from "react";

import { Box, Button, Paper, SxProps, Typography } from "@mui/material";

import { Link } from "react-router-dom";

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

const AccountRow: React.FC<{ id: string }> = ({ id }) => {
    const account = useAccount(id) as Account;

    // const allTransactions = useTransactions();
    const transactions = useTransactionsByAccountID(id);
    // const dispatch = useAppDispatch();

    // console.log(`AccountRow: ${id}`);
    // console.log(allTransactions);
    // console.log(transactions);

    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const accBalance = transactions.reduce(
            (balance, transaction) => balance + transaction.amount,
            0,
        );
        setBalance(accBalance);
    });

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
                sx={{ backgroundColor: "primary.light" }}
            >
                <Button
                    to={`../accounts/${id}`}
                    component={Link}
                    sx={{
                        p: 1,
                        width: 1,
                        textTransform: "none",
                        color: "black",
                    }}
                >
                    <Box
                        sx={{
                            width: 1,
                            display: "flex",
                            flexDirection: "row",
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
                </Button>
            </Paper>
        </>
    );
};

export default AccountRow;
