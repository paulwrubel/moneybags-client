declare module "@mui/material/styles" {
    // interface Theme {
    //     status: {
    //         danger: React.CSSProperties["color"];
    //     };
    // }

    interface Palette {
        triadic: Palette["primary"];
    }
    interface PaletteOptions {
        triadic: PaletteOptions["primary"];
    }

    // interface PaletteColor {
    //     darker?: string;
    // }
    // interface SimplePaletteColorOptions {
    //     darker?: string;
    // }
    // interface ThemeOptions {
    //     status: {
    //         danger: React.CSSProperties["color"];
    //     };
    // }
}

export {};
