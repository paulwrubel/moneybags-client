import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
    Box,
    Button,
    IconButton,
    Paper,
    SxProps,
    Typography,
} from "@mui/material";

import dayjs from "dayjs";

import { setSelectedMonth } from "data/CoreSlice";
import { useAppDispatch, useSelectedMonth } from "data/Hooks";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return <Box sx={{ mx: 1, ...sx }}>{children}</Box>;
};

const MonthHeader = () => {
    const dispatch = useAppDispatch();

    const selectedMonth = useSelectedMonth();

    return (
        <Paper
            square
            elevation={0}
            sx={{
                boxSizing: "border-box",
                width: 1,
                p: 1,
                backgroundColor: "primary.light",
                height: "64px",
                color: "white",
            }}
        >
            <Box
                sx={{
                    // boxSizing: "border-box",
                    // width: 1,
                    height: 1,
                    // minHeight: "inherit",
                    display: "flex",
                    // flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Item sx={{ maxWidth: 0.5, flexGrow: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Item>
                            <IconButton
                                onClick={() => {
                                    dispatch(
                                        setSelectedMonth(
                                            dayjs(selectedMonth)
                                                .subtract(1, "month")
                                                .valueOf(),
                                        ),
                                    );
                                }}
                                sx={{ color: "white" }}
                            >
                                <ArrowLeftIcon />
                            </IconButton>
                        </Item>
                        <Item>
                            <Typography variant="h6">
                                {dayjs(selectedMonth).format("MMMM, YYYY")}
                            </Typography>
                        </Item>
                        <Item>
                            <IconButton
                                onClick={() => {
                                    dispatch(
                                        setSelectedMonth(
                                            dayjs(selectedMonth)
                                                .add(1, "month")
                                                .valueOf(),
                                        ),
                                    );
                                }}
                                sx={{ color: "white" }}
                            >
                                <ArrowRightIcon />
                            </IconButton>
                        </Item>
                    </Box>
                </Item>
                <Item>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            dispatch(
                                setSelectedMonth(
                                    dayjs().startOf("month").valueOf(),
                                ),
                            );
                        }}
                        sx={{ color: "white", borderColor: "white" }}
                    >
                        Go To Current Month
                    </Button>
                </Item>
            </Box>
        </Paper>
    );
};

export default MonthHeader;
