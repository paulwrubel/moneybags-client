import { SxProps } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { SystemStyleObject } from "@mui/system";

const SolidTextField = ({
    value,
    setValue,
    inputBaseSx,
    ...textFieldProps
}: {
    value: string;
    setValue: (arg0: string) => void;
    inputBaseSx?: SystemStyleObject;
} & TextFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const { sx, inputProps, ...textFieldPropsRest } = textFieldProps;
    const { sx: inputSx, ...inputPropsRest } = inputProps || {};

    return (
        <TextField
            onChange={handleChange}
            // onKeyDown={handleKeypress}
            // onFocus={handleFocus}
            // onBlur={handleBlur}
            value={value}
            inputProps={{
                sx: { ...inputSx },
                ...inputPropsRest,
            }}
            sx={{
                "& .MuiInputBase-root": {
                    ...inputBaseSx,
                },
                ...sx,
            }}
            {...textFieldPropsRest}
        />
    );
};

export default SolidTextField;
