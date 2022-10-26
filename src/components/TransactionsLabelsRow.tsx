import { Box, Divider, Paper, SxProps, Typography } from "@mui/material";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return <Box sx={{ mx: 1, ...sx }}>{children}</Box>;
};

// const Divider = () => {
//     return (
//         <Box
//             sx={{
//                 alignSelf: "stretch",
//                 mx: 1,
//                 border: "1px solid",
//                 borderColor: "gray",
//                 // borderRadius: "full",
//             }}
//         />
//     );
// };

const TransactionsLabelsRow = ({
    all,
    columnRatios,
}: {
    all: boolean;
    columnRatios: number[];
}) => {
    let columnIndex = 0;

    return (
        <Paper
            square
            elevation={1}
            sx={{
                mb: 0.4,
                position: "sticky",
                top: 64,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {all && (
                    <>
                        <Item sx={{ width: columnRatios[columnIndex++] }}>
                            <Typography>Account</Typography>
                        </Item>
                        <Divider orientation="vertical" flexItem />
                    </>
                )}
                <Item sx={{ width: columnRatios[columnIndex++] }}>
                    <Typography>Date</Typography>
                </Item>
                <Divider orientation="vertical" flexItem />
                <Item sx={{ width: columnRatios[columnIndex++] }}>
                    <Typography>Category</Typography>
                </Item>
                <Divider orientation="vertical" flexItem />
                <Item sx={{ width: columnRatios[columnIndex++] }}>
                    <Typography>Note</Typography>
                </Item>
                <Divider orientation="vertical" flexItem />
                <Item sx={{ width: columnRatios[columnIndex++] }}>
                    <Typography>Amount</Typography>
                </Item>
            </Box>
        </Paper>
    );
};

export default TransactionsLabelsRow;
