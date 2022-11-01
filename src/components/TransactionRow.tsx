/* eslint-disable sonarjs/no-duplicate-string */
import { Box, SxProps, Typography } from "@mui/material";

import dayjs from "dayjs";

import { useAccount, useCategoriesIncludeSystem } from "data/Hooks";
import { Account, Transaction } from "models/Budget";
import Theme from "Theme";
import { formatCurrencyCents } from "Utils";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return (
        <Box
            sx={{
                // display: "flex",
                // alignItems: "center",
                // height: 1,
                px: 1,
                boxSizing: "border-box",
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

const HoverableTypography = ({
    isSelected,
    noWrap,
    children,
    sx,
}: {
    isSelected: boolean;
    noWrap?: boolean;
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return (
        <Typography
            noWrap={noWrap}
            sx={{
                width: 1,
                // minWidth: "1rem",
                minHeight: "1.5rem",
                textAlign: "left",
                ":hover": isSelected
                    ? {
                          outlineColor: (theme) => theme.palette.primary.dark,
                          outlineStyle: "solid",
                          outlineWidth: "0.1rem",
                          borderRadius: "0.18rem",
                      }
                    : undefined,
                ...sx,
            }}
        >
            {children}
        </Typography>
    );
};

const TransactionRow = ({
    isSelected,
    isEditing,
    showAccount,
    index,
    transaction,
    columnRatios,
}: {
    isSelected: boolean;
    isEditing: boolean;
    showAccount?: boolean;
    index: number;
    transaction: Transaction;
    columnRatios: number[];
}) => {
    const account = useAccount(transaction.accountID) as Account;
    const categories = useCategoriesIncludeSystem();

    let columnIndex = 0;

    const bgColor = (() => {
        if (isEditing) {
            return index % 2 === 0 ? "red" : "green";
        }
        if (isSelected) {
            return index % 2 === 0 ? "primary.light" : "primary.lighter";
        }
        return index % 2 === 0 ? "neutral.light" : "white";
    })();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: 1,
                height: "32px",
                boxSizing: "border-box",
                backgroundColor: bgColor,
            }}
        >
            {showAccount && (
                <Item
                    sx={{
                        display: "flex",
                        width: columnRatios[columnIndex++],
                    }}
                >
                    <Typography noWrap>{account.name}</Typography>
                </Item>
            )}
            <Item
                sx={{
                    display: "flex",
                    width: columnRatios[columnIndex++],
                }}
            >
                <Typography noWrap>
                    {dayjs(transaction.timestamp).format("YYYY-MM-DD")}
                </Typography>
            </Item>
            <Item
                sx={{
                    display: "flex",
                    width: columnRatios[columnIndex++],
                }}
            >
                <Typography noWrap>
                    {
                        categories.find(
                            ({ id }) => id === transaction.categoryID,
                        )?.name
                    }
                </Typography>
            </Item>
            <Item
                sx={{
                    display: "flex",
                    width: columnRatios[columnIndex++],
                }}
            >
                <Typography noWrap>{transaction.note}</Typography>
            </Item>
            <Item
                sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    width: columnRatios[columnIndex++],
                }}
            >
                <Typography
                    noWrap
                    sx={{
                        textAlign: "right",
                    }}
                >
                    {formatCurrencyCents(transaction.amount, { sign: "$" })}
                </Typography>
            </Item>
        </Box>
    );
};

export default TransactionRow;
