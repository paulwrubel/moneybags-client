import { Box, SxProps } from "@mui/material";

import { Property } from "csstype";
// import BackgroundColor from "@mui/material/CssBaseline";

const SolidSelectable = ({
    isSelected,
    color,
    selectedColor,
    hoverColor,
    children,
    sx,
}: {
    isSelected: boolean;
    color: Property.BackgroundColor;
    selectedColor: Property.BackgroundColor;
    hoverColor: Property.BackgroundColor;
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return (
        <Box
            sx={{
                backgroundColor: isSelected ? selectedColor : color,
                ":hover": {
                    backgroundColor: isSelected ? selectedColor : hoverColor,
                },
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export default SolidSelectable;
