import { Box, Grid, Paper } from "@mui/material";

import CategoryGroupList from "components/CategoryGroupList";
import CategoryHeader from "components/CategoryHeader";
import ContextPanel from "components/ContextPanel";
import MonthHeader from "components/MonthHeader";

const AllocationsView: React.FC = () => {
    return (
        <>
            <Grid item xs={6}>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        height: 1,
                        maxHeight: "100vh",
                        bgcolor: "white",
                        overflow: "auto",
                    }}
                    // color="blue"
                >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <MonthHeader />
                        <CategoryHeader />
                        <CategoryGroupList />
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <ContextPanel />
            </Grid>
        </>
    );
};

export default AllocationsView;
