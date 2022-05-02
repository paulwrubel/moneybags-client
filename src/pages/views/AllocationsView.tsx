import { Grid } from "@mui/material";

import CenterPanel from "components/CenterPanel";
import ContextPanel from "components/ContextPanel";

const AllocationsView: React.FC = () => {
    return (
        <>
            <Grid item xs={8}>
                <CenterPanel />
            </Grid>
            <Grid item xs={2}>
                <ContextPanel />
            </Grid>
        </>
    );
};

export default AllocationsView;
