import { Box, SxProps, Typography } from "@mui/material";

import SolidNumericTextField from "components/SolidNumericTextField";
import { setAllocated } from "data/BudgetSlice";
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

const CategoryRow = ({ category: { id, name } }: { category: Category }) => {
    const selectedMonth = useSelectedMonth();
    const allocated = useAllocatedByCategoryIDAndMonth(id, selectedMonth);
    const activity = useActivityByCategoryIDAndMonth(id, selectedMonth);
    const balance = useBalanceByCategoryIDAndMonth(id, selectedMonth);
    const dispatch = useAppDispatch();

    const handleSetAllocated = (value: number) => {
        dispatch(setAllocated({ id, value, month: selectedMonth }));
    };

    return (
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
                    size="small"
                    value={allocated}
                    setValue={handleSetAllocated}
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
    );
};

export default CategoryRow;
