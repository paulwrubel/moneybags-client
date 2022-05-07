import { Box } from "@mui/material";

import TransactionRow from "components/TransactionRow";
import { useTransactions } from "data/Hooks";
import { Account } from "models/Budget";

const TransactionsList = ({ account }: { account?: Account }) => {
    const allTransactions = useTransactions();

    const transactions = account
        ? allTransactions.filter(({ accountID }) => accountID === account.id)
        : allTransactions;

    return (
        // <Paper square elevation={0}>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
            }}
        >
            {transactions.map((transaction, index) => {
                return (
                    <TransactionRow
                        showAccount={!account}
                        key={transaction.id}
                        index={index}
                        transaction={transaction}
                    />
                );
                // return (
                //     <Box
                //         key={id}
                //         sx={{
                //             display: "flex",
                //             flexDirection: "row",
                //             // mx: 1,
                //             width: 1,
                //             backgroundColor:
                //                 index % 2 === 0 ? "neutral.light" : "white",
                //         }}
                //     >
                //         {!account && (
                //             <Item sx={{ width: 0.2 }}>
                //                 <Typography>{tAccount.name}</Typography>
                //             </Item>
                //         )}
                //         <Item sx={{ width: 0.2 }}>
                //             <Typography>
                //                 {dayjs(timestamp).format("YYYY-MM-DD")}
                //             </Typography>
                //         </Item>
                //         <Item sx={{ width: account ? 0.3 : 0.2 }}>
                //             <Typography>
                //                 {
                //                     categories.find(
                //                         ({ id }) => id === categoryID,
                //                     )?.name
                //                 }
                //             </Typography>
                //         </Item>
                //         <Item sx={{ width: account ? 0.35 : 0.25 }}>
                //             <Typography>{note}</Typography>
                //         </Item>
                //         <Item sx={{ width: 0.15 }}>
                //             <Typography>{amount}</Typography>
                //         </Item>
                //     </Box>
                // );
            })}
        </Box>
        // </Paper>
    );
};

export default TransactionsList;
