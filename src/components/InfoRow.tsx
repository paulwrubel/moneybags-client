import { Box, Typography } from "@mui/material";

const Item = ({ children }: { children: React.ReactNode }) => {
    return <Box sx={{ mx: 2, my: 1 }}>{children}</Box>;
};

const InfoRow = ({ version }: { version: string }) => {
    return (
        <Box
            sx={{
                width: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Item>
                <Typography>Solid Budget</Typography>
            </Item>
            <Item>
                <Typography>{version}</Typography>
            </Item>
        </Box>
    );
};

export default InfoRow;
