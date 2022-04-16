import { Typography, Paper, Divider, Stack, Box } from "@mui/material";
import EnvelopeStackList from "./EnvelopeStackList";

const CenterPanel: React.FC = () => {
    return (
        <Paper
            square
            elevation={0}
            sx={{ height: 1, bgcolor: "white" }}
            color="blue"
        >
            <Stack
                direction="row"
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
                width={1}
                // justifyContent="center"
            >
                <Box width={"100%"} padding={2}>
                    <Typography noWrap>Envelope</Typography>
                </Box>
                <Box width={"100%"} padding={2}>
                    <Typography sx={{ textAlign: "right" }}>
                        Available
                    </Typography>
                </Box>
            </Stack>

            <EnvelopeStackList />
        </Paper>
    );
};

export default CenterPanel;
