import { useEffect, useState } from "react";

import { TextFieldProps } from "@mui/material/TextField";
import { SystemStyleObject } from "@mui/system";

import SolidTextField from "components/SolidTextField";
import { formatCurrencyCents, getSelectionText } from "Utils";

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
        // console.log("the event: " + event.data);
        // console.log("inputType: " + event.inputType);
        // console.log("+ test: " + /[+\-*/]/.test("+"));
        // console.log("- test: " + /[+\-*/]/.test("-"));
        // console.log("* test: " + /[+\-*/]/.test("*"));
        // console.log("/ test: " + /[+\-*/]/.test("/"));
        if (/[+\-*/]/.test(event.data ?? "")) {
            // console.log(event.data);
            // event.preventDefault();

            const selection = window.getSelection() ?? document.getSelection();
            const selectionText = getSelectionText();

            // console.log(selection);
            if (selection) {
                console.log(selection.type);
                // eslint-disable-next-line no-debugger
                // debugger;
                // console.log(
                //     "has removeAllRanges?: ",
                //     !!selection.removeAllRanges,
                // );
                // console.log("has empty?: ", !!selection.empty);
                // console.log("has collapeToEnd?: ", !!selection.collapseToEnd);
                // console.log("1 the selection: " + selection.toString());
                // console.log("2 the selection TEXT: " + selectionText);
                // selection.selectAllChildren(event.currentTarget);
                // console.log("2 the selection: " + selection.toString());
                // event.target?.select();
                // console.log("3 the selection: " + selection.toString());
                // selection.removeAllRanges();
                // selection.empty();
                // selection.collapseToEnd();
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
        let valueString = valueInput.replaceAll(",", "");
        valueString = valueString.replaceAll(/[^-()\d+*/.]/g, "");

        try {
            value = Function(`
            "use strict";
            return (
                ${valueString}
            );
        `)();
        } catch (error) {
            if (error instanceof SyntaxError) {
                value = 0;
            } else {
                console.error(error);
            }
        }
        if (isNaN(value) || !isFinite(value)) {
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
