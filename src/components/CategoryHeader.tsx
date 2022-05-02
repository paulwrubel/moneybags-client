import { useState } from "react";

import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";

import NewCategoryGroupPopper from "components/NewCategoryGroupPopper";

const CategoryHeader: React.FC = () => {
    const columnHeaderSx = {
        width: 0.15,
        padding: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    };

    const [newCategoryGroupPopoverIsOpen, setNewCategoryGroupPopoverIsOpen] =
        useState(false);
    const [
        newCategoryGroupPopoverAnchorEl,
        setNewCategoryGroupPopoverAnchorEl,
    ] = useState<Element | null>(null);

    return (
        <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
            width={1}
            // justifyContent="center"
        >
            <Box sx={{ ...columnHeaderSx, width: 0.55 }}>
                <Typography noWrap>Category</Typography>
                <IconButton
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        setNewCategoryGroupPopoverIsOpen(true);
                        setNewCategoryGroupPopoverAnchorEl(event.currentTarget);
                    }}
                >
                    <AddCircleSharpIcon />
                </IconButton>
                {/* {newCategoryGroupPopoverIsOpen && ( */}
                <NewCategoryGroupPopper
                    isOpen={newCategoryGroupPopoverIsOpen}
                    setIsOpen={setNewCategoryGroupPopoverIsOpen}
                    anchorEl={newCategoryGroupPopoverAnchorEl}
                    setAnchorEl={setNewCategoryGroupPopoverAnchorEl}
                />
                {/* )} */}
            </Box>
            <Box sx={{ ...columnHeaderSx }}>
                <Typography sx={{ textAlign: "right" }}>Allocated</Typography>
            </Box>
            <Box sx={{ ...columnHeaderSx }}>
                <Typography sx={{ textAlign: "right" }}>Activity</Typography>
            </Box>
            <Box sx={{ ...columnHeaderSx }}>
                <Typography sx={{ textAlign: "right" }}>Balance</Typography>
            </Box>
        </Stack>
    );
};

export default CategoryHeader;
