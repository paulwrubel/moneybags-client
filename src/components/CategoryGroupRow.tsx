import React, { useState } from "react";

import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    IconButton,
    SxProps,
    Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";

import CategoryRow from "components/CategoryRow";
import NewCategoryPopper from "components/NewCategoryPopper";
import { useCategoriesByGroupID } from "data/Hooks";
import { CategoryGroup } from "models/Budget";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}) => {
    return <Box sx={{ mx: 1, ...sx }}>{children}</Box>;
};

const CategoryGroupRow: React.FC<{
    categoryGroup: CategoryGroup;
}> = ({ categoryGroup: { id, name } }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const categories = useCategoriesByGroupID(id);

    const [newCategoryPopoverIsOpen, setNewCategoryPopoverIsOpen] =
        useState(false);
    const [newCategoryPopoverAnchorEl, setNewCategoryPopoverAnchorEl] =
        useState<Element | null>(null);

    return (
        <>
            <Accordion
                disableGutters
                expanded={isExpanded}
                // onChange={(_, isExpanded: boolean) => setIsExpanded(isExpanded)}
            >
                <AccordionSummary>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            p: 1,
                        }}
                        // divider={<Typography color="gray">|</Typography>}
                    >
                        <Item>
                            <Typography color="gray">Category Group</Typography>
                        </Item>
                        <Item>
                            <Typography>{name}</Typography>
                        </Item>

                        <Item>
                            <IconButton
                                onClick={(
                                    event: React.MouseEvent<HTMLButtonElement>,
                                ) => {
                                    setNewCategoryPopoverIsOpen(true);
                                    setNewCategoryPopoverAnchorEl(
                                        event.currentTarget,
                                    );
                                }}
                            >
                                <AddCircleSharpIcon />
                            </IconButton>
                            <NewCategoryPopper
                                categoryGroupID={id}
                                isOpen={newCategoryPopoverIsOpen}
                                setIsOpen={setNewCategoryPopoverIsOpen}
                                anchorEl={newCategoryPopoverAnchorEl}
                                setAnchorEl={setNewCategoryPopoverAnchorEl}
                            />
                        </Item>
                        <Item sx={{ alignSelf: "flex-end" }}>
                            <IconButton
                                onClick={() => {
                                    setIsExpanded(!isExpanded);
                                }}
                            >
                                {isExpanded ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                )}
                            </IconButton>
                        </Item>
                    </Box>
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
