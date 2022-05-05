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
    setIsExpanded,
}: {
    categoryGroupID: string;
    isOpen: boolean;
    anchorEl: Element | null;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const dispatch = useAppDispatch();

    const [categoryName, setCategoryName] = useState("");

    const close = () => {
        setIsOpen(false);
        setAnchorEl(null);
        setCategoryName("");
    };

    const submit = () => {
        handleAddCategory();
        close();
        setIsExpanded(true);
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
        <SolidPopper isOpen={isOpen} anchorEl={anchorEl} close={close}>
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
                            autoFocus
                            label="Category Name"
                            value={categoryName}
                            onKeyDown={(
                                event: React.KeyboardEvent<HTMLDivElement>,
                            ) => {
                                console.log(event.key);
                                if (event.key === "Enter") {
                                    submit();
                                }
                            }}
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
                                onClick={close}
                                variant="outlined"
                                sx={{
                                    color: "black",
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={submit}
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
