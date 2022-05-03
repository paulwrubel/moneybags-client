import { lightBlue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// const SKY_AQUA = "#b0e0e6";
const COMPLEMENTARY = "#d14a02";
const TRIADIC = "#d10289";

const Theme = createTheme({
    palette: {
        primary: {
            main: lightBlue[700],
        },
        secondary: {
            main: COMPLEMENTARY,
        },
        triadic: {
            main: TRIADIC,
        },
    },
});

Theme.palette.triadic = Theme.palette.augmentColor({
    color: Theme.palette.triadic,
});

export default Theme;
