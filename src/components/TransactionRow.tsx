import { Box, SxProps, Typography } from "@mui/material";

import dayjs from "dayjs";

import { useAccount, useCategoriesIncludeSystem } from "data/Hooks";
import { Account, Transaction } from "models/Budget";
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

const TransactionRow = ({
    showAccount,
    index,
    transaction,
}: {
    showAccount?: boolean;
    index: number;
    transaction: Transaction;
}) => {
    const account = useAccount(transaction.accountID) as Account;
    const categories = useCategoriesIncludeSystem();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                // mx: 1,
                width: 1,
                backgroundColor: index % 2 === 0 ? "neutral.light" : "white",
            }}
        >
            {showAccount && (
                <Item sx={{ width: 0.2 }}>
                    <Typography>{account.name}</Typography>
                </Item>
            )}
            <Item sx={{ width: 0.2 }}>
                <Typography>
                    {dayjs(transaction.timestamp).format("YYYY-MM-DD")}
                </Typography>
            </Item>
            <Item sx={{ width: showAccount ? 0.2 : 0.3 }}>
                <Typography>
                    {
                        categories.find(
                            ({ id }) => id === transaction.categoryID,
                        )?.name
                    }
                </Typography>
            </Item>
            <Item sx={{ width: showAccount ? 0.25 : 0.35 }}>
                <Typography>{transaction.note}</Typography>
            </Item>
            <Item sx={{ width: 0.15 }}>
                <Typography>
                    {formatCurrencyCents(transaction.amount, { sign: "$" })}
                </Typography>
            </Item>
        </Box>
    );
};

export default TransactionRow;
