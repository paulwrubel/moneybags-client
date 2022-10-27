import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { Box, Button, Paper, SxProps } from "@mui/material";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return <Box sx={{ mx: 1, ...sx }}>{children}</Box>;
};

const TransactionsHeader = ({
    setIsAddingTransaction,
}: {
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
                color: "black",
                position: "sticky",
                top: 0,
                // position: "-webkit-sticky",
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
                    // justifyContent: "space-between",
                }}
            >
                <Item sx={{}}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setIsAddingTransaction(true);
                        }}
                        size="small"
                        startIcon={<AddCircleOutlineSharpIcon />}
                        sx={{
                            textTransform: "none",
                            color: "white",
                            // backgroundColor: "primary.main",
                            borderColor: "white",
                            ":hover": {
                                // color: "primary.dark",
                                // borderColor: "primary.dark",
                                backgroundColor: "primary.main",
                                borderColor: "white",
                            },
                        }}
                    >
                        Add
                    </Button>
                </Item>
                <Item sx={{}}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setIsAddingTransaction(true);
                        }}
                        size="small"
                        startIcon={<EditSharpIcon />}
                        sx={{
                            textTransform: "none",
                            color: "white",
                            // backgroundColor: "primary.main",
                            borderColor: "white",
                            ":hover": {
                                // color: "primary.dark",
                                // borderColor: "primary.dark",
                                backgroundColor: "primary.main",
                                borderColor: "white",
                            },
                        }}
                    >
                        Edit
                    </Button>
                </Item>
            </Box>
        </Paper>
    );
};

export default TransactionsHeader;
