/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sonarjs/no-duplicate-string */
import { useEffect, useState } from "react";

import { Box, SxProps, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

import SolidAutocomplete from "components/solid/SolidAutocomplete";
import SolidNumericTextField from "components/solid/SolidNumericTextField";
import SolidTextField from "components/solid/SolidTextField";
import { addTransactions } from "data/BudgetSlice";
import {
    useAccount,
    useAccounts,
    useAppDispatch,
    useCategories,
    useCategoriesIncludeSystem,
} from "data/Hooks";
import { Account, Category, Transaction } from "models/Budget";
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
    const categoriesIncSystem = useCategoriesIncludeSystem();

    // data model stuff
    const dispatch = useAppDispatch();

    const accounts = useAccounts() as Account[];

    const categories = useCategories() as Category[];

    // ui state stuff
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(
        account ?? null,
    );
    const [accountNameInput, setAccountNameInput] = useState("");
    const [timestamp, setTimestamp] = useState(
        dayjs(transaction.timestamp) ?? dayjs().startOf("day"),
    );
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        categoriesIncSystem.find(({ id }) => id === transaction.categoryID) ??
            null,
    );
    const [categoryNameInput, setCategoryNameInput] = useState("");
    const [note, setNote] = useState(transaction.note ?? "");
    const [amount, setAmount] = useState(transaction.amount ?? 0);

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

    // useEffect(() => {
    //     handleClose();
    // }, [account]);

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

    // const handleAddButtonClick = () => {
    //     // checkError();
    //     setHadAddButtonInteraction(true);
    //     if (!isInErrorState(true)) {
    //         dispatch(
    //             addTransactions([
    //                 {
    //                     accountID: (selectedAccount as Account).id,
    //                     timestamp: timestamp.startOf("day").valueOf(),
    //                     categoryID: (selectedCategory as Category).id,
    //                     note: note,
    //                     amount: amount,
    //                 },
    //             ]),
    //         );
    //         resetFormValues();
    //         close();
    //     }
    // };

    // const handleClose = () => {
    //     resetFormValues();
    //     close();
    // };

    // const close = () => {
    //     setIsAddingTransaction(false);
    // };

    const bgColor = (() => {
        if (isSelected || isEditing) {
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
                    {isEditing ? (
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
                    ) : (
                        <Typography noWrap>{account.name}</Typography>
                    )}
                </Item>
            )}
            <Item
                sx={{
                    display: "flex",
                    width: columnRatios[columnIndex++],
                }}
            >
                {isEditing ? (
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
                ) : (
                    <Typography noWrap>
                        {dayjs(transaction.timestamp).format("YYYY-MM-DD")}
                    </Typography>
                )}
            </Item>
            <Item
                sx={{
                    display: "flex",
                    width: columnRatios[columnIndex++],
                }}
            >
                {isEditing ? (
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
                ) : (
                    <Typography noWrap>
                        {
                            categoriesIncSystem.find(
                                ({ id }) => id === transaction.categoryID,
                            )?.name
                        }
                    </Typography>
                )}
            </Item>
            <Item
                sx={{
                    display: "flex",
                    width: columnRatios[columnIndex++],
                }}
            >
                {isEditing ? (
                    <SolidTextField
                        fullWidth
                        error={isNoteError()}
                        value={note}
                        onChange={(e) => {
                            setHadNoteInteraction(true);
                            setNote(e.target.value);
                        }}
                        sx={{ height: 1 }}
                        inputBaseSx={{ height: 1 }}
                    />
                ) : (
                    <Typography noWrap>{transaction.note}</Typography>
                )}
            </Item>
            <Item
                sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    width: columnRatios[columnIndex++],
                }}
            >
                {isEditing ? (
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
                ) : (
                    <Typography
                        noWrap
                        sx={{
                            textAlign: "right",
                        }}
                    >
                        {formatCurrencyCents(transaction.amount, { sign: "$" })}
                    </Typography>
                )}
            </Item>
        </Box>
    );
};

export default TransactionRow;
