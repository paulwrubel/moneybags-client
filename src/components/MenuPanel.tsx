import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

// import { Menu as MenuIcon } from "@mui/icons-material";
import { useActiveBudgetHeader } from "data/Hooks";
import { BudgetHeader } from "models/Budget";

import BudgetMenu from "./BudgetMenu";

// import { useData } from "data/DataProvider";

const MenuPanel: React.FC = () => {
    const header = useActiveBudgetHeader() as BudgetHeader;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

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
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MenuPanel;
