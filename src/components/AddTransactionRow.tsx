import { useEffect, useState } from "react";

import {
    Box,
    Button,
    ClickAwayListener,
    SxProps,
    TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

import SolidAutocomplete from "components/SolidAutocomplete";
import SolidNumericTextField from "components/SolidNumericTextField";
import SolidTextField from "components/SolidTextField";
import { addTransaction } from "data/BudgetSlice";
import { useAccounts, useAppDispatch, useCategories } from "data/Hooks";
import { Account, Category } from "models/Budget";

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
    // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
    const showAccount = !account;

    // data model stuff
    const dispatch = useAppDispatch();

    const accounts = useAccounts() as Account[];

    const categories = useCategories() as Category[];

    // ui state stuff
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(
        account ?? null,
    );
    const [accountNameInput, setAccountNameInput] = useState("");
    const [timestamp, setTimestamp] = useState(dayjs().startOf("day"));
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null,
    );
    const [categoryNameInput, setCategoryNameInput] = useState("");
    const [note, setNote] = useState("");
    const [amount, setAmount] = useState(0);

    const [hadAccountInteraction, setHadAccountInteraction] = useState(false);
    const [hadTimestampInteraction, setHadTimestampInteraction] =
        useState(false);
    const [hadCategoryInteraction, setHadCategoryInteraction] = useState(false);
    const [hadNoteInteraction, setHadNoteInteraction] = useState(false);
    const [hadAmountInteraction, setHadAmountInteraction] = useState(false);
    const [hadAddButtonInteraction, setHadAddButtonInteraction] =
        useState(false);

    const [isAccountAutocompleteOpen, setIsAccountAutocompleteOpen] =
        useState(false);
    const [isCategoryAutocompleteOpen, setIsCategoryAutocompleteOpen] =
        useState(false);

    useEffect(() => {
        setSelectedAccount(account ?? null);
    }, [account]);

    let columnIndex = 0;

    const hadInteraction = () => {
        return (
            hadAccountInteraction ||
            hadTimestampInteraction ||
            hadCategoryInteraction ||
            hadNoteInteraction ||
            hadAmountInteraction ||
            hadAddButtonInteraction
        );
    };

    const isAccountError = (didInteractionJustNow: boolean) =>
        (didInteractionJustNow || hadInteraction()) && !selectedAccount;
    const isTimestampError = () => false;
    const isCategoryError = (didInteractionJustNow: boolean) =>
        (didInteractionJustNow || hadInteraction()) && !selectedCategory;
    const isNoteError = () => false;
    const isAmountError = () => false;

    const isInErrorState = (didInteractionJustNow: boolean) => {
        return (
            isAccountError(didInteractionJustNow) ||
            isTimestampError() ||
            isCategoryError(didInteractionJustNow) ||
            isNoteError() ||
            isAmountError()
        );
    };

    const resetFormValues = () => {
        setSelectedAccount(account ?? null);
        setAccountNameInput("");
        setTimestamp(dayjs().startOf("day"));
        setSelectedCategory(null);
        setCategoryNameInput("");
        setNote("");
        setAmount(0);

        // interactions
        setHadAccountInteraction(false);
        setHadTimestampInteraction(false);
        setHadCategoryInteraction(false);
        setHadNoteInteraction(false);
        setHadAmountInteraction(false);
        setHadAddButtonInteraction(false);
    };

    const handleAddButtonClick = () => {
        // checkError();
        setHadAddButtonInteraction(true);
        if (!isInErrorState(true)) {
            dispatch(
                addTransaction({
                    accountID: (selectedAccount as Account).id,
                    timestamp: timestamp.startOf("day").valueOf(),
                    categoryID: (selectedCategory as Category).id,
                    note: note,
                    amount: amount,
                }),
            );
            resetFormValues();
            close();
        }
    };

    const handleClose = () => {
        resetFormValues();
        close();
    };

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
                            value={selectedAccount}
                            setValue={(value) => {
                                setHadAccountInteraction(true);
                                setSelectedAccount(value);
                            }}
                            inputValue={accountNameInput}
                            setInputValue={(value) => {
                                setHadAccountInteraction(true);
                                setAccountNameInput(value);
                            }}
                            options={accounts}
                            getOptionLabel={(o) => o.name}
                            renderInput={(params) => (
                                <TextField
                                    required
                                    error={isAccountError(false)}
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
                    <DatePicker
                        inputFormat="YYYY-MM-DD"
                        value={timestamp}
                        onChange={(value) => {
                            setHadTimestampInteraction(true);
                            setTimestamp(value ?? dayjs());
                        }}
                        renderInput={(params) => (
                            <TextField
                                error={isTimestampError()}
                                sx={{
                                    height: 1,
                                    "& .MuiInputBase-root": {
                                        // flexWrap: "nowrap",
                                        height: 1,
                                    },
                                }}
                                {...params}
                            />
                        )}
                        // sx={{ height: 1 }}
                    />
                    {/* <SolidTextField
                        fullWidth
                        error={isTimestampError()}
                        value={timestamp.format("YYYY-MM-DD")}
                        setValue={(value) => {
                            setHadTimestampInteraction(true);
                            setTimestamp(dayjs(value));
                        }}
                        sx={{ height: 1 }}
                        inputBaseSx={{ height: 1 }}
                    /> */}
                    {/* <Typography>
                    {dayjs(transaction.timestamp).format("YYYY-MM-DD")}
                </Typography> */}
                </Item>
                <Item sx={{ height: 1, width: columnRatios[columnIndex++] }}>
                    <SolidAutocomplete
                        fullWidth
                        open={isCategoryAutocompleteOpen}
                        onOpen={() => {
                            setIsCategoryAutocompleteOpen(true);
                        }}
                        onClose={() => {
                            setIsCategoryAutocompleteOpen(false);
                        }}
                        value={selectedCategory}
                        setValue={(value) => {
                            setHadCategoryInteraction(true);
                            setSelectedCategory(value);
                        }}
                        inputValue={categoryNameInput}
                        setInputValue={(value) => {
                            setHadCategoryInteraction(true);
                            setCategoryNameInput(value);
                        }}
                        options={categories}
                        getOptionLabel={(c) => c.name}
                        // eslint-disable-next-line sonarjs/no-identical-functions
                        renderInput={(params) => (
                            <TextField
                                error={isCategoryError(false)}
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
                        error={isNoteError()}
                        value={note}
                        setValue={(value) => {
                            setHadNoteInteraction(true);
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
                        error={isAmountError()}
                        value={amount}
                        setValue={(value) => {
                            setHadAmountInteraction(true);
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
                        onClick={handleAddButtonClick}
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
                        onClick={handleClose}
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
                // console.log(hadInteraction());
                if (!hadInteraction()) {
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
