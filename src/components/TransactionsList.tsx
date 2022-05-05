import { Box, SxProps, Typography } from "@mui/material";

import dayjs from "dayjs";

import { useCategoriesIncludeSystem, useTransactions } from "data/Hooks";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return <Box sx={{ mx: 1, ...sx }}>{children}</Box>;
};

const TransactionsList = () => {
    const transactions = useTransactions();
    const categories = useCategoriesIncludeSystem();

    return (
        // <Paper square elevation={0}>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
            }}
        >
            {transactions.map(
                ({ id, categoryID, timestamp, note, amount }, index) => (
                    <Box
                        key={id}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            // mx: 1,
                            width: 1,
                            backgroundColor:
                                index % 2 === 0 ? "neutral.light" : "white",
                        }}
                    >
                        <Item sx={{ width: 0.2 }}>
                            <Typography>
                                {dayjs(timestamp).format("YYYY-MM-DD")}
                            </Typography>
                        </Item>
                        <Item sx={{ width: 0.3 }}>
                            <Typography>
                                {
                                    categories.find(
                                        ({ id }) => id === categoryID,
                                    )?.name
                                }
                            </Typography>
                        </Item>
                        <Item sx={{ width: 0.35 }}>
                            <Typography>{note}</Typography>
                        </Item>
                        <Item sx={{ width: 0.15 }}>
                            <Typography>{amount}</Typography>
                        </Item>
                    </Box>
                ),
            )}
        </Box>
        // </Paper>
    );
};

export default TransactionsList;
