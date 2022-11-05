import { useState } from "react";

import { Box, Button, Paper, TextField } from "@mui/material";

import SolidPopper from "components/solid/SolidPopper";
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

    const submit = () => {
        handleAddCategoryGroup();
        close();
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
                            label="Category Group Name"
                            value={categoryGroupName}
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

export default NewCategoryGroupPopper;
