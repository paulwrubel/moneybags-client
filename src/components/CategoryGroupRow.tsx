import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
    IconButton,
} from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import CategoryRow from "components/CategoryRow";
import { useState } from "react";
import { CategoryGroup } from "models/Budget";
import {
    useAppSelector,
    useAppDispatch,
    useCategoriesByGroupID,
} from "data/Hooks";

const CategoryGroupRow: React.FC<{
    categoryGroup: CategoryGroup;
}> = ({ categoryGroup: { id, name, sort } }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const categories = useCategoriesByGroupID(id);
    const dispatch = useAppDispatch();

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
