import { Typography, Stack, Paper, Box, Divider } from "@mui/material";
// import Envelope from "./Envelope";

const Envelope: React.FC<{
    envelope: {
        id: string;
        name: string;
        amount: number;
    };
}> = ({ envelope: { id, name, amount } }) => {
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
                    <Box width={"100%"} padding={2}>
                        <Typography noWrap>{name}</Typography>
                    </Box>
                    <Box width={"100%"} padding={2}>
                        <Typography sx={{ textAlign: "right" }}>
                            {amount}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </>
    );
};

export default Envelope;
