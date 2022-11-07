import { useState } from "react";

import { TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

import SolidAutocomplete from "components/solid/SolidAutocomplete";
import SolidNumericTextField from "components/solid/SolidNumericTextField";
import SolidTextField from "components/solid/SolidTextField";
import { Account, Category } from "models/Budget";
import { formatCurrencyCents } from "Utils";

export const AccountItem = ({
    isEditing,
    submit,
    currentValue,
    selectedValue,
    setSelectedValue,
    options,
}: {
    isEditing: boolean;
    submit: () => void;
    currentValue: Account | null;
    selectedValue: Account | null;
    setSelectedValue: (value: Account | null) => void;
    options: Account[];
}) => {
    const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    return isEditing ? (
        <SolidAutocomplete
            fullWidth
            open={isAutocompleteOpen}
            onOpen={() => {
                setIsAutocompleteOpen(true);
            }}
            onClose={() => {
                setIsAutocompleteOpen(false);
            }}
            onKeyDown={(event) => {
                console.log(event.key);
                if (event.key === "Enter" && selectedValue) {
                    console.log(selectedValue);
                    submit();
                }
            }}
            value={selectedValue}
            setValue={setSelectedValue}
            inputValue={inputValue}
            setInputValue={setInputValue}
            options={options}
            getOptionLabel={(a) => a.name}
            renderInput={(params) => (
                <TextField
                    required
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
            {currentValue?.name ?? "__ACOUNT_NEEDED__"}
        </Typography>
    );
};

export const DateItem = ({
    isEditing,
    currentValue,
    selectedValue,
    setSelectedValue,
}: {
    isEditing: boolean;
    currentValue: dayjs.Dayjs;
    selectedValue: dayjs.Dayjs;
    setSelectedValue: (value: dayjs.Dayjs) => void;
}) => {
    return isEditing ? (
        <DatePicker
            inputFormat="YYYY-MM-DD"
            value={selectedValue}
            onChange={(value) => {
                setSelectedValue(value ?? dayjs());
            }}
            renderInput={(params) => (
                <TextField
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
        <Typography noWrap>{currentValue.format("YYYY-MM-DD")}</Typography>
    );
};

export const CategoryItem = ({
    isEditing,
    currentValue,
    selectedValue,
    setSelectedValue,
    options,
}: {
    isEditing: boolean;
    currentValue: Category | null;
    selectedValue: Category | null;
    setSelectedValue: (value: Category | null) => void;
    options: Category[];
}) => {
    const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    return isEditing ? (
        <SolidAutocomplete
            fullWidth
            open={isAutocompleteOpen}
            onOpen={() => {
                setIsAutocompleteOpen(true);
            }}
            onClose={() => {
                setIsAutocompleteOpen(false);
            }}
            value={selectedValue}
            setValue={setSelectedValue}
            inputValue={inputValue}
            setInputValue={setInputValue}
            options={options}
            getOptionLabel={(c) => c.name}
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
    ) : (
        <Typography noWrap>
            {currentValue?.name ?? "__CATEGORY_NEEDED__"}
        </Typography>
    );
};

export const NoteItem = ({
    isEditing,
    currentValue,
    selectedValue,
    setSelectedValue,
}: {
    isEditing: boolean;
    currentValue: string;
    selectedValue: string;
    setSelectedValue: (value: string) => void;
}) => {
    return isEditing ? (
        <SolidTextField
            fullWidth
            value={selectedValue}
            onChange={(e) => {
                setSelectedValue(e.target.value);
            }}
            sx={{ height: 1 }}
            inputBaseSx={{ height: 1 }}
        />
    ) : (
        <Typography noWrap>{currentValue}</Typography>
    );
};

export const AmountItem = ({
    isEditing,
    currentValue,
    selectedValue,
    setSelectedValue,
}: {
    isEditing: boolean;
    currentValue: number;
    selectedValue: number;
    setSelectedValue: (value: number) => void;
}) => {
    return isEditing ? (
        <SolidNumericTextField
            fullWidth
            value={selectedValue}
            setValue={setSelectedValue}
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
            {formatCurrencyCents(currentValue, { sign: "$" })}
        </Typography>
    );
};
