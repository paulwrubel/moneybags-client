import { useState } from "react";

import {
    Box,
    Button,
    ClickAwayListener,
    SxProps,
    TextField,
} from "@mui/material";
import { AutocompleteOption } from "@mui/material/Autocomplete";

import dayjs from "dayjs";

import SolidAutocomplete from "components/SolidAutocomplete";
import SolidNumericTextField from "components/SolidNumericTextField";
import SolidTextField from "components/SolidTextField";
import { useAccounts } from "data/Hooks";
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
    isAddingTransaction,
    setIsAddingTransaction,
}: {
    account?: Account;
    columnRatios: number[];
    isAddingTransaction: boolean;
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const showAccount = !account;

    // data model stuff
    const accounts = useAccounts() as Account[];
    const accountOptions = accounts.map((a) => {
        return {
            // id: a.id,
            label: a.name,
        };
    }) as AutocompleteOption[];

    // ui state stuff
    const [accountName, setAccountName] = useState<string | null>("");
    const [accountNameInput, setAccountNameInput] = useState("");
    const [timestamp, setTimestamp] = useState(dayjs().startOf("day"));
    const [categoryName, setCategoryName] = useState<string | null>("");
    const [categoryNameInput, setCategoryNameInput] = useState("");
    const [note, setNote] = useState("");
    const [amount, setAmount] = useState(0);

    const [isAccountError, setIsAccountError] = useState(false);
    const [isTimestampError, setIsTimestampError] = useState(false);
    const [isCategoryError, setIsCategoryError] = useState(false);
    const [isAmountError, setIsTAmountError] = useState(false);

    const [hadInteraction, setHadInteraction] = useState(false);

    const [isAccountAutocompleteOpen, setIsAccountAutocompleteOpen] =
        useState(false);
    const [isCategoryAutocompleteOpen, setIsCategoryAutocompleteOpen] =
        useState(false);

    let columnIndex = 0;

    const close = () => {
        setIsAddingTransaction(false);
    };

    const content = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                width: 1,
                // py: 1,
                // bgcolor: "primary.main",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    // mx: 1,
                    my: 1,
                    width: 1,
                    height: 30,
                    // backgroundColor: "white",
                }}
            >
                {showAccount && (
                    <Item
                        sx={{
                            width: columnRatios[columnIndex++],
                            height: 1,
                        }}
                    >
                        <SolidAutocomplete
                            fullWidth
                            open={isAccountAutocompleteOpen}
                            onOpen={() => {
                                setIsAccountAutocompleteOpen(true);
                            }}
                            onClose={() => {
                                setIsAccountAutocompleteOpen(false);
                            }}
                            value={accountName}
                            setValue={(value) => {
                                setHadInteraction(true);
                                setAccountName(value);
                            }}
                            inputValue={accountNameInput}
                            setInputValue={(value) => {
                                setHadInteraction(true);
                                setAccountNameInput(value);
                            }}
                            options={accountOptions}
                            renderInput={(params) => (
                                <TextField
                                    sx={{
                                        height: 1,
                                    }}
                                    {...params}
                                />
                            )}
                            sx={{
                                height: 1,
                                "& .MuiInputBase-root": {
                                    flexWrap: "nowrap",
                                    height: 1,
                                },
                            }}
                        />
                        {/* <SolidTextField
                            fullWidth
                            // margin="dense"
                            value={accountName}
                            setValue={(value) => {
                                setHadInteraction(true);
                                setAccountName(value);
                            }}
                            sx={{ height: 1 }}
                            inputBaseSx={{ height: 1 }}
                            inputProps={{ sx: { height: 1 } }}
                        /> */}
                        {/* <Typography>{account.name}</Typography> */}
                    </Item>
                )}
                <Item sx={{ width: columnRatios[columnIndex++], height: 1 }}>
                    <SolidTextField
                        fullWidth
                        error={isTimestampError}
                        value={timestamp.format("YYYY-MM-DD")}
                        setValue={(value) => {
                            setHadInteraction(true);
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
                        open={isCategoryAutocompleteOpen}
                        onOpen={() => {
                            console.log("opening DIRECT");
                            setIsCategoryAutocompleteOpen(true);
                            console.log("DONE OPENING");
                        }}
                        onClose={() => {
                            console.log("closing DIRECT");
                            setIsCategoryAutocompleteOpen(false);
                            console.log("DONE CLOSING");
                        }}
                        value={categoryName}
                        setValue={(value) => {
                            setHadInteraction(true);
                            setCategoryName(value);
                        }}
                        inputValue={categoryNameInput}
                        setInputValue={(value) => {
                            setHadInteraction(true);
                            setCategoryNameInput(value);
                        }}
                        options={["Test 1", "Test 2", "Test 3"]}
                        // eslint-disable-next-line sonarjs/no-identical-functions
                        renderInput={(params) => (
                            <TextField
                                sx={{
                                    height: 1,
                                }}
                                {...params}
                            />
                        )}
                        sx={{
                            height: 1,
                            "& .MuiInputBase-root": {
                                flexWrap: "nowrap",
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
                            setHadInteraction(true);
                            setNote(value);
                        }}
                        sx={{ height: 1 }}
                        inputBaseSx={{ height: 1 }}
                    />
                    {/* <Typography>{transaction.note}</Typography> */}
                </Item>
                <Item sx={{ width: columnRatios[columnIndex++] }}>
                    <SolidNumericTextField
                        fullWidth
                        value={amount}
                        setValue={(value) => {
                            setHadInteraction(true);
                            setAmount(value);
                        }}
                        sx={{ height: 1 }}
                        inputBaseSx={{ height: 1 }}
                    />
                    {/* <Typography>
                    {formatCurrencyCents(transaction.amount, { sign: "$" })}
                </Typography> */}
                </Item>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    // mx: 1,
                    my: 1,
                    width: 1,
                    height: 30,
                    // backgroundColor: "white",
                }}
            >
                <Item sx={{ height: 1 }}>
                    <Button
                        // color="contained"
                        variant="contained"
                        disableElevation
                        onClick={() => {}}
                        size="small"
                        sx={{ textTransform: "none", color: "black" }}
                    >
                        Add
                    </Button>
                </Item>
                <Item sx={{ height: 1 }}>
                    <Button
                        // color="contained"
                        variant="outlined"
                        disableElevation
                        onClick={close}
                        size="small"
                        sx={{
                            textTransform: "none",
                            color: "black",
                            borderColor: "black",
                        }}
                    >
                        Cancel
                    </Button>
                </Item>
            </Box>
        </Box>
    );

    return isAddingTransaction ? (
        <ClickAwayListener
            onClickAway={() => {
                console.log(hadInteraction);
                if (!hadInteraction) {
                    close();
                }
            }}
        >
            {content}
        </ClickAwayListener>
    ) : (
        content
    );
};

export default AddTransactionRow;
