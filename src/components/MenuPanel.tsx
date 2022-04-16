import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
// import { Menu as MenuIcon } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

const MenuPanel: React.FC<{ username: string }> = ({ username }) => {
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
                        Moneybags
                    </Typography>
                    <Typography variant="h6">
                        This is your budget, Mr. {username}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MenuPanel;
