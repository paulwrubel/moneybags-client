import { Typography, Stack, Paper, Box, Divider } from "@mui/material";
// import Envelope from "./Envelope";

const Category: React.FC<{
    category: {
        id: string;
        name: string;
        previousBalance: number;
        allocated: number;
        activity: number;
    };
}> = ({ category: { id, name, previousBalance, allocated, activity } }) => {
    const balance = previousBalance + allocated + activity;

    return (
        // <>
        //     {envelopeStacks.envelopes.map((envelope) => (
        //         <Envelope key={envelope.id} envelopeStack={envelopeStack} />
        //     ))}
        // </>
        <>
            <Paper>
                <Stack
                    direction="row"
                    spacing={2}
                    divider={<Divider orientation="vertical" flexItem />}
                    width={1}
                    // justifyContent="center"
                >
                    <Box width={"55%"} padding={2}>
                        <Typography noWrap>{name}</Typography>
                    </Box>
                    <Box width={"15%"} padding={2}>
                        <Typography sx={{ textAlign: "right" }}>
                            {allocated}
                        </Typography>
                    </Box>
                    <Box width={"15%"} padding={2}>
                        <Typography sx={{ textAlign: "right" }}>
                            {activity}
                        </Typography>
                    </Box>
                    <Box width={"15%"} padding={2}>
                        <Typography sx={{ textAlign: "right" }}>
                            {balance}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </>
    );
};

export default Category;
