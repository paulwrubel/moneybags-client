/* eslint-disable sonarjs/no-duplicate-string */
import { Box, Paper, Typography } from "@mui/material";

import { useCategories, useTransactions } from "data/Hooks";
import { formatCurrencyCents } from "Utils";

const ContextPanel: React.FC = () => {
    const categories = useCategories();
    const transactions = useTransactions();

    const totalAllocated = categories.reduce(
        (total, cat) => total + cat.allocated,
        0,
    );
    const totalActivity = categories.reduce(
        (total, cat) => total + cat.activity,
        0,
    );
    const totalBalance = categories.reduce(
        (total, cat) =>
            total + cat.allocated + cat.activity + cat.previousBalance,
        0,
    );

    const totalUnallocated =
        transactions.reduce((total, trans) => total + trans.amount, 0) -
        totalAllocated;

    return (
        <Paper
            square
            elevation={0}
            sx={{ height: 1, bgcolor: "primary.light" }}
            color="blue"
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    px: 2,
                    py: 1,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: 1,
                        boxSizing: "border-box",
                        m: 1,
                        backgroundColor:
                            totalUnallocated === 0
                                ? undefined
                                : totalUnallocated > 0
                                ? "warning.light"
                                : "error.light",
                    }}
                >
                    <Box
                        sx={{
                            p: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h4">
                            {formatCurrencyCents(totalUnallocated)}
                        </Typography>
                        {totalUnallocated === 0 && (
                            <Typography>All Funds Allocated</Typography>
                        )}
                        {totalUnallocated > 0 && (
                            <Typography>Unallocated Funds</Typography>
                        )}
                        {totalUnallocated < 0 && (
                            <Typography>Overallocated Funds</Typography>
                        )}
                    </Box>
                </Paper>
                <Paper
                    elevation={3}
                    sx={{
                        width: 1,
                        boxSizing: "border-box",
                        m: 1,
                        p: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "stretch",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography>Total Allocated</Typography>
                            <Typography>
                                {formatCurrencyCents(totalAllocated)}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography>Total Activity</Typography>
                            <Typography>
                                {formatCurrencyCents(totalActivity)}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography>Total Balance</Typography>
                            <Typography>
                                {formatCurrencyCents(totalBalance)}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Paper>
    );
};

export default ContextPanel;
