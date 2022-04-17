import { Typography, Paper, Divider, Stack, Box } from "@mui/material";
import CategoryGroupList from "./CategoryGroupList";

const CenterPanel: React.FC = () => {
    return (
        <Paper
            square
            elevation={0}
            sx={{ height: 1, bgcolor: "white" }}
            color="blue"
        >
            <Stack
                direction="row"
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
                width={1}
                // justifyContent="center"
            >
                <Box width={"55%"} padding={2}>
                    <Typography noWrap>Category</Typography>
                </Box>
                <Box width={"15%"} padding={2}>
                    <Typography sx={{ textAlign: "right" }}>
                        Allocated
                    </Typography>
                </Box>
                <Box width={"15%"} padding={2}>
                    <Typography sx={{ textAlign: "right" }}>
                        Activity
                    </Typography>
                </Box>
                <Box width={"15%"} padding={2}>
                    <Typography sx={{ textAlign: "right" }}>Balance</Typography>
                </Box>
            </Stack>

            <CategoryGroupList />
        </Paper>
    );
};

export default CenterPanel;
