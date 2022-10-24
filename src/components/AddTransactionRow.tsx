import { useState } from "react";

import { Box, SxProps, TextField } from "@mui/material";

import dayjs from "dayjs";

import SolidAutocomplete from "components/SolidAutocomplete";
import SolidNumericTextField from "components/SolidNumericTextField";
import SolidTextField from "components/SolidTextField";
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
    const [categoryName, setCategoryName] = useState<string | null>("");
    const [categoryNameInput, setCategoryNameInput] = useState("");
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
                height: 30,
                // backgroundColor: "white",
            }}
        >
            {showAccount && (
                <Item sx={{ width: columnRatios[columnIndex++], height: 1 }}>
                    <SolidTextField
                        fullWidth
                        // margin="dense"
                        value={accountName}
                        setValue={(value) => {
                            setAccountName(value);
                        }}
                        sx={{ height: 1 }}
                        inputBaseSx={{ height: 1 }}
                        inputProps={{ sx: { height: 1 } }}
                    />
                    {/* <Typography>{account.name}</Typography> */}
                </Item>
            )}
            <Item sx={{ width: columnRatios[columnIndex++], height: 1 }}>
                <SolidTextField
                    fullWidth
                    value={timestamp.format("YYYY-MM-DD")}
                    setValue={(value) => {
                        setTimestamp(dayjs(value));
                    }}
                    sx={{ height: 1 }}
                    inputBaseSx={{ height: 1 }}
                />
                {/* <Typography>
                    {dayjs(transaction.timestamp).format("YYYY-MM-DD")}
                </Typography> */}
            </Item>
            <Item sx={{ height: 1, width: columnRatios[columnIndex++] }}>
                <SolidAutocomplete
                    fullWidth
                    // label="Name"
                    value={categoryName}
                    setValue={(value) => {
                        setCategoryName(value);
                    }}
                    inputValue={categoryNameInput}
                    setInputValue={(value) => {
                        setCategoryNameInput(value);
                    }}
                    options={["Test 1", "Test 2", "Test 3"]}
                    renderInput={(params) => (
                        <TextField
                            margin="dense"
                            label="Category"
                            sx={{ height: 1 }}
                            {...params}
                        />
                    )}
                    sx={{
                        height: 1,
                        "& .MuiInputBase-root": {
                            // "& input": {
                            height: 1,
                        },
                    }}
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
                <SolidTextField
                    fullWidth
                    value={note}
                    setValue={(value) => {
                        setNote(value);
                    }}
                    sx={{ height: 1 }}
                    inputBaseSx={{ height: 1 }}
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
