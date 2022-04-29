import { useState } from "react";

import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import CategoryRow from "components/CategoryRow";
import { useAppDispatch, useCategoriesByGroupID } from "data/Hooks";
import { CategoryGroup } from "models/Budget";

const CategoryGroupRow: React.FC<{
    categoryGroup: CategoryGroup;
}> = ({ categoryGroup: { id, name } }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const categories = useCategoriesByGroupID(id);

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
                        <IconButton onClick={() => {}}>
                            <AddCircleSharpIcon />
                        </IconButton>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                    {categories.map((cat) => (
                        <CategoryRow key={cat.id} category={cat} />
                    ))}
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default CategoryGroupRow;
