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

const TransactionsHeader = () => {
    return (
        <Paper square elevation={1}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Item sx={{ width: 0.2 }}>
                    <Typography>Date</Typography>
                </Item>
                <Divider orientation="vertical" flexItem />
                <Item sx={{ width: 0.3 }}>
                    <Typography>Category</Typography>
                </Item>
                <Divider orientation="vertical" flexItem />
                <Item sx={{ width: 0.35 }}>
                    <Typography>Note</Typography>
                </Item>
                <Divider orientation="vertical" flexItem />
                <Item sx={{ width: 0.15 }}>
                    <Typography>Amount</Typography>
                </Item>
            </Box>
        </Paper>
    );
};

export default TransactionsHeader;
