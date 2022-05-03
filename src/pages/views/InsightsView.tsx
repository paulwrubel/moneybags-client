import { Box, Grid, Paper, Typography } from "@mui/material";

const InsightsView = () => {
    return (
        <>
            <Grid item xs={10}>
                <Paper
                    elevation={0}
                    square
                    sx={{
                        height: 1,
                        maxHeight: "100vh",
                        bgcolor: "white",
                        overflow: "auto",
                    }}
                >
                    <Box
                        sx={{
                            height: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography align="center" fontStyle="italic">
                            INSIGHTS COMING SOON!
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </>
    );
};

export default InsightsView;
