import { useState } from "react";

import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { Box, Divider, IconButton, SxProps, Typography } from "@mui/material";

import NewCategoryGroupPopper from "components/NewCategoryGroupPopper";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return (
        <Box sx={{ ...sx }}>
            <Box sx={{ mx: 1 }}>{children}</Box>
        </Box>
    );
};

const CategoryHeader: React.FC = () => {
    // const columnHeaderSx = {
    //     width: 0.15,
    //     padding: 1,
    //     display: "flex",
    //     flexDirection: "row",
    //     justifyContent: "center",
    //     alignItems: "center",
    // };

    const [newCategoryGroupPopoverIsOpen, setNewCategoryGroupPopoverIsOpen] =
        useState(false);
    const [
        newCategoryGroupPopoverAnchorEl,
        setNewCategoryGroupPopoverAnchorEl,
    ] = useState<Element | null>(null);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
                width: 1,
            }}
        >
            <Item sx={{ width: 0.55 }}>
                <Box sx={{ display: "flex", alignItems: "center", width: 1 }}>
                    <IconButton
                        onClick={(
                            event: React.MouseEvent<HTMLButtonElement>,
                        ) => {
                            setNewCategoryGroupPopoverIsOpen(true);
                            setNewCategoryGroupPopoverAnchorEl(
                                event.currentTarget,
                            );
                        }}
                    >
                        <AddCircleSharpIcon />
                    </IconButton>
                    <NewCategoryGroupPopper
                        isOpen={newCategoryGroupPopoverIsOpen}
                        setIsOpen={setNewCategoryGroupPopoverIsOpen}
                        anchorEl={newCategoryGroupPopoverAnchorEl}
                        setAnchorEl={setNewCategoryGroupPopoverAnchorEl}
                    />
                    <Typography noWrap>Category</Typography>
                </Box>
            </Item>
            <Divider orientation="vertical" flexItem />
            <Item sx={{ width: 0.15 }}>
                <Typography sx={{ textAlign: "right" }}>Allocated</Typography>
            </Item>
            <Divider orientation="vertical" flexItem />
            <Item sx={{ width: 0.15 }}>
                <Typography sx={{ textAlign: "right" }}>Activity</Typography>
            </Item>
            <Divider orientation="vertical" flexItem />
            <Item sx={{ width: 0.15 }}>
                <Typography sx={{ textAlign: "right" }}>Balance</Typography>
            </Item>
        </Box>
    );
};

export default CategoryHeader;
