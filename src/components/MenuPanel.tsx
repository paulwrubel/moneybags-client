import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
// import { Menu as MenuIcon } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useActiveBudgetHeader } from "data/Hooks";
import { BudgetHeader } from "models/Budget";
// import { useData } from "data/DataProvider";

const MenuPanel: React.FC = () => {
    const header = useActiveBudgetHeader() as BudgetHeader;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                elevation={0}
                sx={{ bgcolor: "primary.main" }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {header.name}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MenuPanel;
