// import { SxProps } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { SystemStyleObject } from "@mui/system";

// interface SolidTextFieldAdditionalProps {
//     value: string;
//     // setValue?: (arg0: string) => void;
//     inputBaseSx?: SystemStyleObject;
// }

// interface SolidTextFieldPropsWithSetValue
//     extends SolidTextFieldAdditionalProps {
//     setValue: (arg0: string) => void;
// }

// interface SolidTextFieldPropsWithOnChange
//     extends SolidTextFieldAdditionalProps {
//     onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
// }

// type SolidTextFieldProps = TextFieldProps & SolidTextFieldAdditionalProps;

// {
//     value: string;
//     setValue?: (arg0: string) => void;
//     inputBaseSx?: SystemStyleObject;
// } & TextFieldProps

const SolidTextField = ({
    value,
    // setValue,
    inputBaseSx,
    ...textFieldProps
}: {
    value: string;
    inputBaseSx?: SystemStyleObject;
} & TextFieldProps) => {
    const { sx, inputProps, ...textFieldPropsRest } = textFieldProps;
    const { sx: inputSx, ...inputPropsRest } = inputProps || {};

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (setValue) {
    //         setValue(event.target.value);
    //     }
    // };

    return (
        <TextField
            // onChange={onChange}
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
