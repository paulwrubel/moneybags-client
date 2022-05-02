import { useState } from "react";

import {
    Box,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { setAllocated } from "data/BudgetSlice";
import { useAllocatedByCategoryID, useAppDispatch } from "data/Hooks";
import { Category } from "models/Budget";

const CategoryRow: React.FC<{
    category: Category;
}> = ({ category: { id, name, previousBalance, activity } }) => {
    const allocated = useAllocatedByCategoryID(id);
    const dispatch = useAppDispatch();

    const [allocatedInput, setAllocatedInput] = useState<string>(
        allocated.toString(),
    );

    const handleAllocatedValueBlur = () => {
        let value = parseFloat(allocatedInput);
        if (isNaN(value)) {
            value = 0;
        }
        dispatch(setAllocated({ id, value }));
        setAllocatedInput(value.toString());
    };

    const handleAllocatedValueChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setAllocatedInput(event.target.value);
    };

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
                        <TextField
                            onChange={handleAllocatedValueChange}
                            onBlur={handleAllocatedValueBlur}
                            value={allocatedInput}
                            sx={{ textAlign: "right" }}
                        />
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

export default CategoryRow;
