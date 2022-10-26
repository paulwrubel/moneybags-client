import { useEffect, useState } from "react";

import { TextFieldProps } from "@mui/material/TextField";
import { SystemStyleObject } from "@mui/system";

import SolidTextField from "components/SolidTextField";
import { formatCurrencyCents } from "Utils";

function SolidNumericTextField({
    value,
    setValue,
    inputBaseSx,
    ...textFieldProps
}: {
    value: number;
    setValue: (arg0: number) => void;
    inputBaseSx?: SystemStyleObject;
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
        let valueString = valueInput.replaceAll(",", "");
        valueString = valueString.replaceAll(/[^-()\d+*/.]/g, "");

        value = Function(`"use strict";return (${valueString})`)();
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

    const { inputProps, ...textFieldPropsRest } = textFieldProps;
    const { sx: inputSx, ...inputPropsRest } = inputProps || {};

    return (
        <SolidTextField
            onChange={handleChange}
            onKeyDown={handleKeypress}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={valueInput}
            inputProps={{
                sx: { textAlign: "right", ...inputSx },
                ...inputPropsRest,
            }}
            inputBaseSx={inputBaseSx}
            {...textFieldPropsRest}
        />
    );
}

export default SolidNumericTextField;
