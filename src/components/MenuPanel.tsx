import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import BudgetMenu from "components/BudgetMenu";
import BudgetSettingsDialog from "components/BudgetSettingsDialog";
// import { Menu as MenuIcon } from "@mui/icons-material";
import { useActiveBudgetHeader } from "data/Hooks";
import { BudgetHeader } from "models/Budget";

// import { useData } from "data/DataProvider";

const MenuPanel: React.FC = () => {
    const header = useActiveBudgetHeader() as BudgetHeader;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

    const [isBudgetSettingsDialogOpen, setIsBudgetSettingsDialogOpen] =
        useState(false);

    return (
        // <Box sx={{ flexGrow: 1 }}>
        <AppBar
            position="static"
            elevation={0}
            sx={{ backgroundColor: "primary.dark" }}
        >
            <Toolbar>
                <Box
                    sx={{
                        width: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexGrow: 1,
                        }}
                    >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={(
                                event: React.MouseEvent<HTMLButtonElement>,
                            ) => {
                                setIsMenuOpen(true);
                                setMenuAnchor(event.currentTarget);
                            }}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <BudgetMenu
                            isOpen={isMenuOpen}
                            setIsOpen={setIsMenuOpen}
                            anchorElement={menuAnchor}
                        />
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            {header.name}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton
                            onClick={() => {
                                setIsBudgetSettingsDialogOpen(true);
                            }}
                            sx={{ color: "white" }}
                        >
                            <SettingsIcon />
                        </IconButton>
                        <BudgetSettingsDialog
                            isOpen={isBudgetSettingsDialogOpen}
                            handleClose={() => {
                                setIsBudgetSettingsDialogOpen(false);
                            }}
                        />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
    {
        /* </Box> */
    }
    // );
};

export default MenuPanel;
