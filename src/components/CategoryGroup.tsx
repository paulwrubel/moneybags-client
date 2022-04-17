import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
} from "@mui/material";
import Category from "components/Category";
import { useState } from "react";

const CategoryGroup: React.FC<{
    categoryGroup: {
        id: string;
        name: string;
        categories: {
            id: string;
            name: string;
            previousBalance: number;
            allocated: number;
            activity: number;
        }[];
    };
}> = ({ categoryGroup: { id, name, categories } }) => {
    const [isExpanded, setIsExpanded] = useState(true);

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
                        <Typography color="gray">Category Group</Typography>
                        <Typography>{name}</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                    {categories.map((cat) => (
                        <Category key={cat.id} category={cat} />
                    ))}
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default CategoryGroup;
