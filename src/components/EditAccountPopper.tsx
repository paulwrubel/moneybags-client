// import { useState } from "react";

// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Paper } from "@mui/material";

import SolidPopper from "components/SolidPopper";
import SolidTextField from "components/SolidTextField";
// import { addCategory } from "data/BudgetSlice";
import { removeAccount } from "data/BudgetSlice";
import { useAppDispatch } from "data/Hooks";
import { Account } from "models/Budget";

const Item = ({ children }: { children: React.ReactNode }) => {
    return <Box sx={{ m: 1 }}>{children}</Box>;
};

const EditAccountPopper = ({
    account,
    isOpen,
    anchorEl,
    setIsOpen,
    setAnchorEl,
}: {
    account: Account;
    isOpen: boolean;
    anchorEl: Element | null;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
}) => {
    const dispatch = useAppDispatch();

    const [accountName, setAccountName] = useState(account.name);

    const handleDeleteButtonClick = () => {
        dispatch(removeAccount(account.id));
        // setSelectedTransactions([]);
        close();
    };

    // const handleDuplicateButtonClick = () => {
    //     dispatch(addTransactions(selectedTransactions));
    //     setSelectedTransactions([]);
    //     close();
    // };

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
                        <SolidTextField
                            label="Name"
                            size="small"
                            value={accountName}
                            onChange={(e) => {
                                setAccountName(e.target.value);
                            }}
                            sx={{ width: 1 }}
                        />
                    </Item>
                    <Item>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 1,
                            }}
                        >
                            {/* <Item> */}
                            {/* <Typography>Bingo</Typography> */}
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
                                Close Account
                            </Button>
                            {/* </Item>
                            <Item> */}
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
                                Close Account
                            </Button>
                            {/* </Item>{" "} */}
                        </Box>
                    </Item>
                </Box>
            </Paper>
        </SolidPopper>
    );
};

export default EditAccountPopper;
