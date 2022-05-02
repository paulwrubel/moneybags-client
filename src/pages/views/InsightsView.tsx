import { Grid } from "@mui/material";

import CenterPanel from "components/CenterPanel";

const InsightsView: React.FC = () => {
    return (
        <>
            <Grid item xs={10}>
                <CenterPanel />
            </Grid>
        </>
    );
};

export default InsightsView;
