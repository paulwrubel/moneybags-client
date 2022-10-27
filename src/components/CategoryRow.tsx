import { useEffect, useState } from "react";

import { Box, ButtonBase, SxProps, TextField, Typography } from "@mui/material";

import SolidNumericTextField from "components/SolidNumericTextField";
import { setAllocated, setCategoryName } from "data/BudgetSlice";
import {
    useActivityByCategoryIDAndMonth,
    useAllocatedByCategoryIDAndMonth,
    useAppDispatch,
    useBalanceByCategoryIDAndMonth,
    useSelectedMonth,
} from "data/Hooks";
import { Category } from "models/Budget";
import { formatCurrencyCents } from "Utils";

const Item = ({
    children,
    noMargin = false,
    sx,
    childSx,
}: {
    children: React.ReactNode;
    noMargin?: boolean;
    sx?: SxProps;
    childSx?: SxProps;
}) => {
    return (
        <Box sx={{ ...sx }}>
            <Box sx={{ mx: noMargin ? 0 : 1, ...childSx }}>{children}</Box>
        </Box>
    );
};

const CategoryRow = ({ category: { id, name } }: { category: Category }) => {
    const selectedMonth = useSelectedMonth();
    const allocated = useAllocatedByCategoryIDAndMonth(id, selectedMonth);
    const activity = useActivityByCategoryIDAndMonth(id, selectedMonth);
    const balance = useBalanceByCategoryIDAndMonth(id, selectedMonth);
    const dispatch = useAppDispatch();

    const handleSetAllocated = (value: number) => {
        dispatch(setAllocated({ id, value, month: selectedMonth }));
    };

    const [isInCategoryNameEditMode, setIsInCategoryNameEditMode] =
        useState(false);
    const [categoryNameInputValue, setCategoryNameInputValue] = useState(name);

    useEffect(() => {
        setCategoryNameInputValue(name);
    }, [name]);

    const handleCategoryNameChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        // setIsInCategoryNameEditMode(false);
        setCategoryNameInputValue(event.target.value);
        setCategoryName;
    };

    const handleCategoryNameBlur = () => {
        dispatch(setCategoryName({ id: id, name: categoryNameInputValue }));
        setIsInCategoryNameEditMode(false);
    };

    return (
        <ButtonBase
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                // console.log("clicked");
            }}
            sx={{ width: 1 }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: 1,
                    height: 30,
                    alignItems: "center",
                    // justifyContent="center"
                }}
            >
                <Item sx={{ width: 0.55, height: 1 }} childSx={{ height: 1 }}>
                    {isInCategoryNameEditMode ? (
                        <TextField
                            // size="small"
                            autoFocus
                            value={categoryNameInputValue}
                            onChange={handleCategoryNameChange}
                            onKeyDown={(
                                event: React.KeyboardEvent<HTMLInputElement>,
                            ) => {
                                if (event.key === "Enter") {
                                    (event.target as HTMLElement).blur();
                                }
                            }}
                            onFocus={(
                                event: React.FocusEvent<HTMLInputElement>,
                            ) => {
                                event.target.select();
                            }}
                            onBlur={handleCategoryNameBlur}
                            sx={{
                                height: 1,
                                "& .MuiInputBase-root": {
                                    height: 1,
                                },
                            }}
                            inputProps={{ sx: { px: 1, py: 0 } }}
                        >
                            Weesnaw
                        </TextField>
                    ) : (
                        <ButtonBase
                            onClick={() => {
                                setIsInCategoryNameEditMode(true);
                            }}
                            onBlur={() => {
                                setIsInCategoryNameEditMode(false);
                            }}
                            disableRipple
                            sx={{ height: 1 }}
                        >
                            <Typography noWrap sx={{ minWidth: "1em" }}>
                                {name}
                            </Typography>
                        </ButtonBase>
                    )}
                </Item>
                <Item
                    noMargin
                    sx={{ width: 0.15, height: 1 }}
                    childSx={{ height: 1 }}
                >
                    <SolidNumericTextField
                        // size="small"
                        value={allocated}
                        setValue={handleSetAllocated}
                        sx={{
                            height: 1,
                            "& .MuiInputBase-root": {
                                height: 1,
                            },
                        }}
                        inputProps={{ sx: { px: 1, py: 0 } }}
                    />
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
        </ButtonBase>
    );
};

export default CategoryRow;
