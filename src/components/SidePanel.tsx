// import { useState } from "react";
import { Paper, Typography } from "@mui/material";

const SidePanel: React.FC = () => {
    // const [isOpen, setIsOpen] = useState(true);
    return (
        <Paper
            square
            elevation={0}
            sx={{ height: 1, bgcolor: "primary.light" }}
            color="blue"
        >
            <Typography>MONEYBAGS SIDE PANEL</Typography>
        </Paper>
    );
};

export default SidePanel;
