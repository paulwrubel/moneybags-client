import { useState } from "react";

import { Box, Button, Paper, TextField } from "@mui/material";

import SolidPopper from "components/SolidPopper";
import { addCategory } from "data/BudgetSlice";
import { useAppDispatch } from "data/Hooks";

const Item = ({ children }: { children: React.ReactNode }) => {
    return <Box sx={{ m: 1 }}>{children}</Box>;
};

const NewCategoryPopper = ({
    categoryGroupID,
    isOpen,
    anchorEl,
    setIsOpen,
    setAnchorEl,
}: {
    categoryGroupID: string;
    isOpen: boolean;
    anchorEl: Element | null;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
}) => {
    const dispatch = useAppDispatch();

    const [categoryName, setCategoryName] = useState("");

    const close = () => {
        setIsOpen(false);
        setAnchorEl(null);
        setCategoryName("");
    };

    const handleAddCategory = () => {
        dispatch(
            addCategory({
                groupID: categoryGroupID,
                name: categoryName,
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
                            label="Category Name"
                            value={categoryName}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                setCategoryName(event.target.value);
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
                                    handleAddCategory();
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

export default NewCategoryPopper;
