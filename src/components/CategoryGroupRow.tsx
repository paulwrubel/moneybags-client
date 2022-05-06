import React, { useState } from "react";

import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    Box,
    IconButton,
    SxProps,
    Typography,
} from "@mui/material";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from "@mui/material/AccordionSummary";

import CategoryRow from "components/CategoryRow";
import NewCategoryPopper from "components/NewCategoryPopper";
import { useCategoriesByGroupID } from "data/Hooks";
import { CategoryGroup } from "models/Budget";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return <Box sx={{ mx: 1, ...sx }}>{children}</Box>;
};

const AccordionSummary = (props: AccordionSummaryProps) => {
    const { sx, ...rest } = props;

    return (
        <MuiAccordionSummary
            // focusVisibleClassName="focus-visible"
            sx={{
                p: 0,
                m: 0,
                // eslint-disable-next-line sonarjs/no-duplicate-string
                backgroundColor: "primary.lightest",
                "&.Mui-focusVisible": {
                    backgroundColor: "primary.lightest",
                },

                "& .MuiAccordionSummary-root": {
                    p: 0,
                    m: 0,
                },
                "& .MuiAccordionSummary-content": { p: 0, m: 0 },
                ...sx,
            }}
            {...rest}
        ></MuiAccordionSummary>
    );
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
        <Accordion
            square
            disableGutters
            elevation={0}
            expanded={isExpanded}

            // onChange={(_, isExpanded: boolean) => setIsExpanded(isExpanded)}
        >
            <AccordionSummary>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: 1,
                    }}
                >
                    <Item>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: 1,
                            }}
                        >
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
                                setIsExpanded={setIsExpanded}
                            />
                            <Typography fontWeight="bold">{name}</Typography>
                        </Box>
                    </Item>
                    <Item sx={{ ml: "auto" }}>
                        <IconButton
                            onClick={() => {
                                setIsExpanded(!isExpanded);
                            }}
                        >
                            {isExpanded ? (
                                <ExpandMoreIcon />
                            ) : (
                                <ExpandLessIcon />
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
    );
};

export default CategoryGroupRow;
