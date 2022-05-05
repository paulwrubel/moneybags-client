import { Box, SxProps, Typography } from "@mui/material";

import SolidNumericTextField from "components/SolidNumericTextField";
import { setAllocated } from "data/BudgetSlice";
import { useAllocatedByCategoryID, useAppDispatch } from "data/Hooks";
import { Category } from "models/Budget";
import { formatCurrencyCents } from "Utils";

const Item = ({
    children,
    noMargin = false,
    sx,
}: {
    children: React.ReactNode;
    noMargin?: boolean;
    sx?: SxProps;
}) => {
    return (
        <Box sx={{ ...sx }}>
            <Box sx={{ mx: noMargin ? 0 : 1 }}>{children}</Box>
        </Box>
    );
};

const CategoryRow = ({
    category: { id, name, previousBalance, activity },
}: {
    category: Category;
}) => {
    const allocated = useAllocatedByCategoryID(id);
    const dispatch = useAppDispatch();

    const handleSetAllocated = (value: number) => {
        dispatch(setAllocated({ id, value }));
    };

    //     const [allocatedInput, setAllocatedInput] = useState<string>(
    //         formatCurrencyCents(allocated, { sign: "" }),
    //     );
    //
    //     const handleAllocatedValueKeypress = (
    //         event: React.KeyboardEvent<HTMLInputElement>,
    //     ) => {
    //         // console.log(event.key);
    //         if (event.key === "Enter") {
    //             (event.target as HTMLElement).blur();
    //             // console.log("did a blur");
    //         }
    //     };
    //
    //     const handleAllocatedValueFocus = (
    //         event: React.FocusEvent<HTMLInputElement>,
    //     ) => {
    //         // setAllocatedInput((allocated / 100).toFixed(2));
    //         event.target.select();
    //     };
    //
    //     const handleAllocatedValueBlur = () => {
    //         // console.log("blurring!");
    //         const preValue = allocatedInput.replace(",", "");
    //         let value = parseFloat(preValue);
    //         if (isNaN(value)) {
    //             value = 0;
    //         }
    //         value = Math.round(value * 100);
    //         dispatch(setAllocated({ id, value }));
    //         setAllocatedInput(formatCurrencyCents(value, { sign: "" }));
    //     };
    //
    //     const handleAllocatedValueChange = (
    //         event: React.ChangeEvent<HTMLInputElement>,
    //     ) => {
    //         setAllocatedInput(event.target.value);
    //     };

    const balance = previousBalance + allocated + activity;

    return (
        // <>
        //     {envelopeStacks.envelopes.map((envelope) => (
        //         <Envelope key={envelope.id} envelopeStack={envelopeStack} />
        //     ))}
        // </>

        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: 1,
                alignItems: "center",
                // justifyContent="center"
            }}
        >
            <Item sx={{ width: 0.55 }}>
                <Typography noWrap>{name}</Typography>
            </Item>
            <Item noMargin sx={{ width: 0.15 }}>
                <SolidNumericTextField
                    value={allocated}
                    setValue={handleSetAllocated}
                />
                {/* <TextField
                    size="small"
                    onChange={handleAllocatedValueChange}
                    onKeyDown={handleAllocatedValueKeypress}
                    onFocus={handleAllocatedValueFocus}
                    onBlur={handleAllocatedValueBlur}
                    value={allocatedInput}
                    inputProps={{ sx: { textAlign: "right" } }}
                    // sx={{ textAlign: "right" }}
                /> */}
            </Item>
            <Item sx={{ width: 0.15 }}>
                <Typography sx={{ textAlign: "right" }}>
                    {formatCurrencyCents(activity, { sign: "" })}
                </Typography>
            </Item>
            <Item sx={{ width: 0.15 }}>
                <Typography sx={{ textAlign: "right" }}>
                    {formatCurrencyCents(balance, { sign: "" })}
                </Typography>
            </Item>
        </Box>
    );
};

export default CategoryRow;
