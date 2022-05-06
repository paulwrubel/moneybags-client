import { useEffect, useState } from "react";

import TextField, { TextFieldProps } from "@mui/material/TextField";

import { formatCurrencyCents } from "Utils";

function SolidNumericTextField({
    value,
    setValue,
    ...textFieldProps
}: {
    value: number;
    setValue: (arg0: number) => void;
} & TextFieldProps) {
    const [valueInput, setValueInput] = useState(
        formatCurrencyCents(value, { sign: "" }),
    );

    useEffect(() => {
        setValueInput(formatCurrencyCents(value, { sign: "" }));
    }, [value]);

    const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // console.log(event.key);
        if (event.key === "Enter") {
            (event.target as HTMLElement).blur();
            // console.log("did a blur");
        }
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        // setAllocatedInput((allocated / 100).toFixed(2));
        event.target.select();
    };

    const handleBlur = () => {
        // console.log("blurring!");
        const preValue = valueInput.replace(",", "");
        let value = parseFloat(preValue);
        if (isNaN(value)) {
            value = 0;
        }
        value = Math.round(value * 100);
        setValue(value);
        setValueInput(formatCurrencyCents(value, { sign: "" }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueInput(event.target.value);
    };

    return (
        <TextField
            onChange={handleChange}
            onKeyDown={handleKeypress}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={valueInput}
            inputProps={{ sx: { textAlign: "right" } }}
            {...textFieldProps}
        />
    );
}

export default SolidNumericTextField;
