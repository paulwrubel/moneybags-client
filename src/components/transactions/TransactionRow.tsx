/* eslint-disable sonarjs/no-duplicate-string */
import { useState } from "react";

import {
    Box,
    SxProps,
    // , TextField, Typography
} from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

// import SolidAutocomplete from "components/solid/SolidAutocomplete";
// import SolidNumericTextField from "components/solid/SolidNumericTextField";
// import SolidTextField from "components/solid/SolidTextField";
import {
    AccountItem,
    AmountItem,
    CancelButtonItem,
    CategoryItem,
    DateItem,
    NoteItem,
    SaveButtonItem,
} from "components/transactions/TransactionRowItems";
import { updateTransactions } from "data/BudgetSlice";
import {
    useAccount,
    useAccounts,
    useAppDispatch,
    useCategories,
    useCategoriesIncludeSystem,
} from "data/Hooks";
import { Account, Category, Transaction } from "models/Budget";
// import Theme from "Theme";
// import { formatCurrencyCents } from "Utils";
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
    isExpanded,
    clearTransactionState,
    showAccount,
    showCategory,
    index,
    transaction,
    columnRatios,
}: {
    isSelected: boolean;
    isEditing: boolean;
    isExpanded: boolean;
    clearTransactionState: () => void;
    showAccount?: boolean;
    showCategory?: boolean;
    index: number;
    transaction: Transaction;
    columnRatios: number[];
    // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
    const account = transaction.accountID
        ? (useAccount(transaction.accountID) as Account)
        : null;
    const categoriesIncSystem = useCategoriesIncludeSystem();

    // data model stuff
    const dispatch = useAppDispatch();

    const accounts = useAccounts() as Account[];
    const categories = useCategories() as Category[];

    // ui state stuff
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(
        account ?? null,
    );
    // const [accountNameInput, setAccountNameInput] = useState("");
    const [timestamp, setTimestamp] = useState(dayjs(transaction.timestamp));
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        categoriesIncSystem.find(({ id }) => id === transaction.categoryID) ??
            null,
    );
    // const [categoryNameInput, setCategoryNameInput] = useState("");
    const [note, setNote] = useState(transaction.note ?? "");
    const [amount, setAmount] = useState(transaction.amount);

    let columnIndex = 0;

    const handleSave = () => {
        submitTransactionChange();
        clearTransactionState();
    };
    const handleCancel = () => {
        clearTransactionState();
    };

    const submitTransactionChange = () => {
        const updatedTransaction = {
            id: transaction.id,
            accountID: selectedAccount?.id ?? transaction.accountID,
            timestamp: timestamp.startOf("day").valueOf(),
            categoryID: selectedCategory?.id ?? transaction.accountID,
            note: note ?? transaction.note,
            amount: amount,
        };
        dispatch(updateTransactions([updatedTransaction]));
    };

    const bgColor =
        isSelected || isEditing
            ? index % 2 === 0
                ? "primary.light"
                : "primary.lighter"
            : index % 2 === 0
            ? "neutral.light"
            : "white";

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: 1,
                height: `${isExpanded ? 64 : 32}px`,
                backgroundColor: bgColor,
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: 1,
                    height: `${32}px`,
                    boxSizing: "border-box",
                }}
            >
                {showAccount && (
                    <Item
                        sx={{
                            display: "flex",
                            width: columnRatios[columnIndex++],
                        }}
                    >
                        <AccountItem
                            isEditing={isEditing}
                            currentValue={account}
                            selectedValue={selectedAccount}
                            setSelectedValue={setSelectedAccount}
                            options={accounts}
                        />
                    </Item>
                )}
                <Item
                    sx={{
                        display: "flex",
                        width: columnRatios[columnIndex++],
                    }}
                >
                    <DateItem
                        isEditing={isEditing}
                        currentValue={dayjs(transaction.timestamp)}
                        selectedValue={timestamp}
                        setSelectedValue={setTimestamp}
                    />
                </Item>
                {showCategory && (
                    <Item
                        sx={{
                            display: "flex",
                            width: columnRatios[columnIndex++],
                        }}
                    >
                        <CategoryItem
                            isEditing={isEditing}
                            isOffBudgetAccount={
                                selectedAccount?.isOffBudget ?? false
                            }
                            currentValue={
                                categoriesIncSystem.find(
                                    ({ id }) => id === transaction.categoryID,
                                ) ?? null
                            }
                            selectedValue={selectedCategory}
                            setSelectedValue={setSelectedCategory}
                            options={categories}
                        />
                    </Item>
                )}
                <Item
                    sx={{
                        display: "flex",
                        width: columnRatios[columnIndex++],
                    }}
                >
                    <NoteItem
                        isEditing={isEditing}
                        currentValue={transaction.note ?? ""}
                        selectedValue={note}
                        setSelectedValue={setNote}
                    />
                </Item>
                <Item
                    sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        width: columnRatios[columnIndex++],
                    }}
                >
                    <AmountItem
                        isEditing={isEditing}
                        currentValue={Math.abs(Math.min(transaction.amount, 0))}
                        selectedValue={Math.abs(Math.min(amount, 0))}
                        setSelectedValue={(outflow) => {
                            if (outflow) {
                                setAmount(-outflow);
                            }
                        }}
                    />
                </Item>
                <Item
                    sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        width: columnRatios[columnIndex++],
                    }}
                >
                    <AmountItem
                        isEditing={isEditing}
                        currentValue={Math.abs(Math.max(transaction.amount, 0))}
                        selectedValue={Math.abs(Math.max(amount, 0))}
                        setSelectedValue={(inflow) => {
                            if (inflow) {
                                setAmount(inflow);
                            }
                        }}
                    />
                </Item>
            </Box>
            {isExpanded && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        width: 1,
                        height: `${32}px`,
                        boxSizing: "border-box",
                    }}
                >
                    <Item>
                        <SaveButtonItem onClick={handleSave} />
                    </Item>
                    <Item>
                        <CancelButtonItem onClick={handleCancel} />
                    </Item>
                </Box>
            )}
        </Box>
    );
};

export default TransactionRow;
