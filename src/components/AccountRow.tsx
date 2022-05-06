import { useEffect, useState } from "react";

import { Box, Paper, SxProps, Typography } from "@mui/material";

import { useAccount, useTransactionsByAccountID } from "data/Hooks";
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
    const account = useAccount(id);

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
            <Paper square elevation={0}>
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
            </Paper>
        </>
    );
};

export default AccountRow;
