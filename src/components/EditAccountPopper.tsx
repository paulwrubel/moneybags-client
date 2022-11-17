// import { useState } from "react";

// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Checkbox, FormControlLabel, Paper } from "@mui/material";

import SolidPopper from "components/solid/SolidPopper";
import SolidTextField from "components/solid/SolidTextField";
// import { addCategory } from "data/BudgetSlice";
import { removeAccount, updateAccount } from "data/BudgetSlice";
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
    const [isOffBudget, setIsOffBudget] = useState(
        account.isOffBudget ?? false,
    );

    const handleDeleteButtonClick = () => {
        dispatch(removeAccount(account.id));
        close();
    };

    const handleSaveButtonClick = () => {
        dispatch(
            updateAccount({
                id: account.id,
                name: accountName,
                isOffBudget: isOffBudget,
            }),
        );
        close();
    };

    const close = () => {
        setIsOpen(false);
        setAnchorEl(null);
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
                        p: 1,
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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isOffBudget}
                                    onChange={(event) => {
                                        setIsOffBudget(event.target.checked);
                                    }}
                                    size="small"
                                    sx={{ p: 0, px: 0.5 }}
                                />
                            }
                            label="Off Budget"
                            sx={{ m: 0 }}
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
                                disableElevation
                                variant="contained"
                                onClick={handleSaveButtonClick}
                                size="small"
                                // startIcon={<DeleteIcon />}
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
                                Save
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
