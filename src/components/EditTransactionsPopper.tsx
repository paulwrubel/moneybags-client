// import { useState } from "react";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Paper } from "@mui/material";

import SolidPopper from "components/SolidPopper";
// import { addCategory } from "data/BudgetSlice";
import { addTransactions, removeTransactions } from "data/BudgetSlice";
import { useAppDispatch } from "data/Hooks";
import { Transaction } from "models/Budget";

const Item = ({ children }: { children: React.ReactNode }) => {
    return <Box sx={{ m: 1 }}>{children}</Box>;
};

const EditTransactionsPopper = ({
    selectedTransactions,
    setSelectedTransactions,
    isOpen,
    anchorEl,
    setIsOpen,
    setAnchorEl,
}: // setIsExpanded,
{
    selectedTransactions: Transaction[];
    setSelectedTransactions: (arg0: Transaction[]) => void;
    isOpen: boolean;
    anchorEl: Element | null;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
    // setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const dispatch = useAppDispatch();
    //
    // const [categoryName, setCategoryName] = useState("");

    const handleDeleteButtonClick = () => {
        dispatch(removeTransactions(selectedTransactions.map((t) => t.id)));
        setSelectedTransactions([]);
        close();
    };

    const handleDuplicateButtonClick = () => {
        dispatch(addTransactions(selectedTransactions));
        setSelectedTransactions([]);
        close();
    };

    const close = () => {
        setIsOpen(false);
        setAnchorEl(null);
        // setCategoryName("");
    };

    // const submit = () => {
    //     handleAddCategory();
    //     close();
    //     setIsExpanded(true);
    // };

    // const handleAddCategory = () => {
    //     dispatch(
    //         addCategory({
    //             groupID: categoryGroupID,
    //             name: categoryName,
    //             sort: 0,
    //         }),
    //     );
    // };

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
                        <Button
                            variant="outlined"
                            onClick={handleDeleteButtonClick}
                            size="small"
                            startIcon={<DeleteIcon />}
                            sx={{
                                // textTransform: "none",
                                color: "black",
                                // // backgroundColor: "primary.main",
                                borderColor: "black",
                                // ":hover": {
                                //     // color: "primary.dark",
                                //     // borderColor: "primary.dark",
                                //     backgroundColor: "primary.main",
                                //     borderColor: "white",
                                // },
                            }}
                        >
                            Delete Selected ({selectedTransactions.length})
                        </Button>
                    </Item>
                    <Item>
                        <Button
                            variant="outlined"
                            onClick={handleDuplicateButtonClick}
                            size="small"
                            startIcon={<ContentCopyIcon />}
                            sx={{
                                // textTransform: "none",
                                color: "black",
                                // // backgroundColor: "primary.main",
                                borderColor: "black",
                                // ":hover": {
                                //     // color: "primary.dark",
                                //     // borderColor: "primary.dark",
                                //     backgroundColor: "primary.main",
                                //     borderColor: "white",
                                // },
                            }}
                        >
                            Duplicate Selected ({selectedTransactions.length})
                        </Button>
                    </Item>
                </Box>
            </Paper>
        </SolidPopper>
    );
};

export default EditTransactionsPopper;
