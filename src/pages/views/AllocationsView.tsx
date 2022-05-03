import { Grid, Paper } from "@mui/material";

import CategoryGroupList from "components/CategoryGroupList";
import CategoryHeader from "components/CategoryHeader";
import ContextPanel from "components/ContextPanel";

const AllocationsView: React.FC = () => {
    return (
        <>
            <Grid item xs={8}>
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
                    <CategoryHeader />
                    <CategoryGroupList />
                </Paper>
            </Grid>
            <Grid item xs={2}>
                <ContextPanel />
            </Grid>
        </>
    );
};

export default AllocationsView;
