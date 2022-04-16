import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
} from "@mui/material";
import Envelope from "./Envelope";
import { useState } from "react";

const EnvelopeStack: React.FC<{
    envelopeStack: {
        id: string;
        name: string;
        envelopes: { id: string; name: string; amount: number }[];
    };
}> = ({ envelopeStack: { id, name, envelopes } }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <Accordion
                disableGutters
                expanded={isExpanded}
                onChange={(_, isExpanded: boolean) => setIsExpanded(isExpanded)}
            >
                <AccordionSummary>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={1}
                        divider={<Typography color="gray">|</Typography>}
                    >
                        <Typography color="gray">Envelope Stack</Typography>
                        <Typography>{name}</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                    {envelopes.map((env) => (
                        <Envelope key={env.id} envelope={env} />
                    ))}
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default EnvelopeStack;
