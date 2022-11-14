import { useEffect, useState } from "react";

import { TextFieldProps } from "@mui/material/TextField";
import { SystemStyleObject } from "@mui/system";

import SolidTextField from "components/solid/SolidTextField";
import { formatCurrencyCents, getSelectionText } from "Utils";

function SolidNumericTextField<T extends number | (number | null)>({
    value,
    setValue,
    inputBaseSx,
    ...textFieldProps
}: {
    value: T;
    setValue: (newValue: T) => void;
    inputBaseSx?: SystemStyleObject;
} & TextFieldProps) {
    const getDisplayFromValue = (v: T) => {
        if (!v) {
            return "";
        }
        return formatCurrencyCents(v, { sign: "" });
    };

    const [valueInput, setValueInput] = useState(getDisplayFromValue(value));

    useEffect(() => {
        setValueInput(getDisplayFromValue(value));
    }, [value]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // console.log(event.key);
        if (event.key === "Enter") {
            (event.target as HTMLElement).blur();
            // console.log("did a blur");
        }
    };

    const handleBeforeInput = (
        event: React.SyntheticEvent<HTMLInputElement> & InputEvent,
    ) => {
        if (/[+\-*/]/.test(event.data ?? "")) {
            const selection = window.getSelection() ?? document.getSelection();
            const selectionText = getSelectionText();

            if (selection) {
                console.log(selection.type);
                if (selectionText === valueInput) {
                    event.preventDefault();
                    setValueInput(valueInput + event.data);
                }
            }
        }
    };

    // const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    //     // setAllocatedInput((allocated / 100).toFixed(2));
    //     event.target.select();
    // };

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        // setAllocatedInput((allocated / 100).toFixed(2));
        event.currentTarget.select();

        // const selection = window.getSelection() ?? document.getSelection();
        // if (selection) {
        //     console.log(selection.type);
        //     console.log("1 the selection: " + selection.toString());
        // }
    };

    const handleBlur = () => {
        // console.log("blurring!");
        const valueString = valueInput
            .replaceAll(",", "")
            .replaceAll(/[^-()\d+*/.]/g, "")
            .trim();

        const valueIsEmpty = valueString === "";
        let newValue;
        try {
            newValue = Function(`
            "use strict";
            return (
                ${valueString}
            );
        `)();
        } catch (error) {
            if (error instanceof SyntaxError) {
                newValue = 0;
            } else {
                console.error(error);
            }
        }
        if (!valueIsEmpty) {
            if (isNaN(newValue) || !isFinite(newValue)) {
                newValue = 0;
            }
            newValue = Math.round(newValue * 100);
        }
        setValue(newValue);
        setValueInput(getDisplayFromValue(newValue));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueInput(event.target.value);
    };

    const { inputProps, ...textFieldPropsRest } = textFieldProps;
    const { sx: inputSx, ...inputPropsRest } = inputProps || {};

    return (
        <SolidTextField
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBeforeInput={handleBeforeInput}
            // onFocus={handleFocus}
            onBlur={handleBlur}
            value={valueInput}
            inputProps={{
                sx: { textAlign: "right", ...inputSx },
                onFocus: handleInputFocus,
                ...inputPropsRest,
            }}
            inputBaseSx={inputBaseSx}
            {...textFieldPropsRest}
        />
    );
}

export default SolidNumericTextField;
