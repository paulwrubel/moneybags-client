/* eslint-disable sonarjs/no-duplicate-string */
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
    return (
        <Box sx={{ px: 1, boxSizing: "border-box", ...sx }}>
            <Box>{children}</Box>
        </Box>
    );
};

const TransactionRow = ({
    isSelected,
    showAccount,
    index,
    transaction,
    columnRatios,
}: {
    isSelected: boolean;
    showAccount?: boolean;
    index: number;
    transaction: Transaction;
    columnRatios: number[];
}) => {
    const account = useAccount(transaction.accountID) as Account;
    const categories = useCategoriesIncludeSystem();

    let columnIndex = 0;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // mx: 1,
                width: 1,
                height: "32px",
                boxSizing: "border-box",
                backgroundColor: isSelected
                    ? // ? "primary.main"
                      index % 2 === 0
                        ? "primary.light"
                        : "primary.lighter"
                    : index % 2 === 0
                    ? "neutral.light"
                    : "white",
            }}
        >
            {showAccount && (
                <Item sx={{ width: columnRatios[columnIndex++] }}>
                    <Typography sx={{ textAlign: "left" }}>
                        {account.name}
                    </Typography>
                </Item>
            )}
            <Item
                sx={{
                    width: columnRatios[columnIndex++],
                }}
            >
                <Typography sx={{ textAlign: "left" }}>
                    {dayjs(transaction.timestamp).format("YYYY-MM-DD")}
                </Typography>
            </Item>
            <Item
                sx={{
                    width: columnRatios[columnIndex++],
                    // boxSizing: "content-box",
                }}
            >
                <Typography
                    noWrap
                    sx={{
                        // boxSizing: "content-box",
                        // width: 0.9,
                        // height: 1,
                        textAlign: "left",
                        // overflow: "hidden",
                        // textOverflow: "ellipsis",
                    }}
                >
                    {
                        categories.find(
                            ({ id }) => id === transaction.categoryID,
                        )?.name
                    }
                </Typography>
            </Item>
            <Item sx={{ width: columnRatios[columnIndex++] }}>
                <Typography sx={{ textAlign: "left" }}>
                    {transaction.note}
                </Typography>
            </Item>
            <Item sx={{ width: columnRatios[columnIndex++] }}>
                <Typography sx={{ textAlign: "right" }}>
                    {formatCurrencyCents(transaction.amount, { sign: "$" })}
                </Typography>
            </Item>
        </Box>
    );
};

export default TransactionRow;
