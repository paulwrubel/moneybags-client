import { Paper } from "@mui/material";

import CategoryGroupList from "components/CategoryGroupList";
import CategoryHeader from "components/CategoryHeader";

const CenterPanel: React.FC = () => {
    return (
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
    );
};

export default CenterPanel;
