import { useState } from "react";

import { Box, SxProps, TextField } from "@mui/material";

import dayjs from "dayjs";

import SolidNumericTextField from "components/SolidNumericTextField";
import { Account } from "models/Budget";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return <Box sx={{ mx: 1, ...sx }}>{children}</Box>;
};

const AddTransactionRow = ({
    account,
    columnRatios,
    setIsAddingTransaction,
}: {
    account?: Account;
    columnRatios: number[];
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const showAccount = !account;

    const [accountName, setAccountName] = useState("");
    const [timestamp, setTimestamp] = useState(dayjs().startOf("day"));
    const [categoryName, setCategoryName] = useState("");
    const [note, setNote] = useState("");
    const [amount, setAmount] = useState(0);

    let columnIndex = 0;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                // mx: 1,
                width: 1,
                backgroundColor: "white",
            }}
        >
            {showAccount && (
                <Item sx={{ width: columnRatios[columnIndex++] }}>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Name"
                        value={accountName}
                        onChange={(event) => {
                            setAccountName(event.target.value);
                        }}
                        sx={{ textAlign: "left" }}
                    />
                    {/* <Typography>{account.name}</Typography> */}
                </Item>
            )}
            <Item sx={{ width: columnRatios[columnIndex++] }}>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Name"
                    value={timestamp.format("YYYY-MM-DD")}
                    onChange={(event) => {
                        setTimestamp(dayjs(event.target.value));
                    }}
                    sx={{ textAlign: "left" }}
                />
                {/* <Typography>
                    {dayjs(transaction.timestamp).format("YYYY-MM-DD")}
                </Typography> */}
            </Item>
            <Item sx={{ width: columnRatios[columnIndex++] }}>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Name"
                    value={categoryName}
                    onChange={(event) => {
                        setCategoryName(event.target.value);
                    }}
                    sx={{ textAlign: "left" }}
                />
                {/* <Typography>
                    {
                        categories.find(
                            ({ id }) => id === transaction.categoryID,
                        )?.name
                    }
                </Typography> */}
            </Item>
            <Item sx={{ width: columnRatios[columnIndex++] }}>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Name"
                    value={note}
                    onChange={(event) => {
                        setNote(event.target.value);
                    }}
                    sx={{ textAlign: "left" }}
                />
                {/* <Typography>{transaction.note}</Typography> */}
            </Item>
            <Item sx={{ width: columnRatios[columnIndex++] }}>
                <SolidNumericTextField value={amount} setValue={setAmount} />
                {/* <Typography>
                    {formatCurrencyCents(transaction.amount, { sign: "$" })}
                </Typography> */}
            </Item>
        </Box>
    );
};

export default AddTransactionRow;
