import { useState } from "react";

import { Box, Button, Paper, TextField } from "@mui/material";

import SolidPopper from "components/SolidPopper";
import { addCategoryGroup } from "data/BudgetSlice";
import { useAppDispatch } from "data/Hooks";

const Item = ({ children }: { children: React.ReactNode }) => {
    return <Box sx={{ m: 1 }}>{children}</Box>;
};

const NewCategoryGroupPopper = ({
    isOpen,
    anchorEl,
    setIsOpen,
    setAnchorEl,
}: {
    isOpen: boolean;
    anchorEl: Element | null;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
}) => {
    const dispatch = useAppDispatch();

    const [categoryGroupName, setCategoryGroupName] = useState("");

    const close = () => {
        setIsOpen(false);
        setAnchorEl(null);
        setCategoryGroupName("");
    };

    const handleAddCategoryGroup = () => {
        dispatch(
            addCategoryGroup({
                name: categoryGroupName,
                sort: 0,
            }),
        );
    };

    return (
        <SolidPopper
            isOpen={isOpen}
            anchorEl={anchorEl}
            setIsOpen={setIsOpen}
            setAnchorEl={setAnchorEl}
        >
            <Paper elevation={10}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                    }}
                >
                    <Item>
                        <TextField
                            label="Category Group Name"
                            value={categoryGroupName}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                setCategoryGroupName(event.target.value);
                            }}
                        />
                    </Item>
                    <Item>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                            }}
                        >
                            <Button
                                onClick={() => {
                                    close();
                                }}
                                variant="outlined"
                                sx={{
                                    color: "black",
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    handleAddCategoryGroup();
                                    close();
                                }}
                                variant="outlined"
                                sx={{
                                    color: "black",
                                }}
                            >
                                Add
                            </Button>
                        </Box>
                    </Item>
                </Box>
            </Paper>
        </SolidPopper>
    );
};

export default NewCategoryGroupPopper;