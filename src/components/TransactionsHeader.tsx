import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
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
                backgroundColor: "primary.main",
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
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Item sx={{ flexGrow: 1 }}>
                    <Button
                        onClick={() => {
                            setIsAddingTransaction(true);
                        }}
                        size="small"
                        startIcon={<AddCircleOutlineSharpIcon />}
                        sx={{ textTransform: "none", color: "black" }}
                    >
                        Add transaction
                    </Button>
                </Item>
            </Box>
        </Paper>
    );
};

export default TransactionsHeader;
