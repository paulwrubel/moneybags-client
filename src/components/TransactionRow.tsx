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
                display: "flex",
                alignItems: "center",
                height: 1,
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
                minWidth: "1rem",
                // minHeight: "1.5rem",
                // textAlign: "left",
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
                <Item
                    sx={{
                        // display: "flex",
                        width: columnRatios[columnIndex++],
                    }}
                >
                    <HoverableTypography isSelected={isSelected}>
                        {account.name}
                    </HoverableTypography>
                </Item>
            )}
            <Item
                sx={{
                    // display: "flex",
                    width: columnRatios[columnIndex++],
                }}
            >
                <HoverableTypography isSelected={isSelected}>
                    {dayjs(transaction.timestamp).format("YYYY-MM-DD")}
                </HoverableTypography>
            </Item>
            <Item
                sx={{
                    // display: "flex",
                    width: columnRatios[columnIndex++],
                }}
            >
                <HoverableTypography isSelected={isSelected} noWrap>
                    {
                        categories.find(
                            ({ id }) => id === transaction.categoryID,
                        )?.name
                    }
                </HoverableTypography>
            </Item>
            <Item
                sx={{
                    // display: "flex",
                    width: columnRatios[columnIndex++],
                }}
            >
                <HoverableTypography isSelected={isSelected} noWrap>
                    {transaction.note}
                </HoverableTypography>
            </Item>
            <Item
                sx={{
                    // display: "flex",
                    flexDirection: "row-reverse",
                    width: columnRatios[columnIndex++],
                }}
            >
                <HoverableTypography
                    isSelected={isSelected}
                    sx={{
                        textAlign: "right",
                    }}
                >
                    {formatCurrencyCents(transaction.amount, { sign: "$" })}
                </HoverableTypography>
            </Item>
        </Box>
    );
};

export default TransactionRow;
