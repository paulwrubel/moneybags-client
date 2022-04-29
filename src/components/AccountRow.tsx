import { useEffect, useState } from "react";

import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

import {
    useAccount,
    useTransactions,
    useTransactionsByAccountID,
} from "data/Hooks";

const AccountRow: React.FC<{ id: string }> = ({ id }) => {
    const account = useAccount(id);

    const allTransactions = useTransactions();
    const transactions = useTransactionsByAccountID(id);
    // const dispatch = useAppDispatch();

    console.log(`AccountRow: ${id}`);
    console.log(allTransactions);
    console.log(transactions);

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
            <Paper>
                <Stack
                    direction="row"
                    spacing={2}
                    divider={<Divider orientation="vertical" flexItem />}
                    width={1}
                    // justifyContent="center"
                >
                    <Box width={"15%"} padding={2}>
                        <Typography sx={{ textAlign: "right" }}>
                            {account.name}
                        </Typography>
                    </Box>
                    <Box width={"15%"} padding={2}>
                        <Typography sx={{ textAlign: "right" }}>
                            {balance}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </>
    );
};

export default AccountRow;
