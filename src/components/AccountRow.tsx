import {
    Typography,
    Stack,
    Paper,
    Box,
    Divider,
    TextField,
} from "@mui/material";
import { useState } from "react";
// import Envelope from "./Envelope";
import { CategoryGroup, Category, Account, Transaction } from "models/Budget";
import {
    useAppSelector,
    useAppDispatch,
    useAccount,
    useTransactionsByAccountID,
} from "data/Hooks";
import { setAllocated } from "data/BudgetSlice";

const AccountRow: React.FC<{ id: string }> = ({ id }) => {
    const account = useAccount(id);

    const transactions = useTransactionsByAccountID(id);
    const dispatch = useAppDispatch();

    const currentBalance = transactions.reduce(
        (balance, transaction) => balance + transaction.amount,
        0,
    );

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
                            {currentBalance}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </>
    );
};

export default AccountRow;
