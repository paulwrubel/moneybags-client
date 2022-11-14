import { ChangeEvent, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Input,
    InputLabel,
    TextField,
} from "@mui/material";

import JSZip from "jszip";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { useAppDispatch, useBudgetHeaders } from "data/Hooks";
import { addBudgetHeader } from "data/MetadataSlice";
import {
    parseYNABBudgetFileStringAsync,
    parseYNABTransactionsFileStringAsync,
} from "Utils";

const ImportBudgetDialog = ({
    isOpen,
    handleClose,
}: {
    isOpen: boolean;
    handleClose: () => void;
}) => {
    const navigate = useNavigate();

    const [budgetName, setBudgetName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();
    const dispatch = useAppDispatch();
    const budgetHeaders = useBudgetHeaders();

    const isValid =
        budgetName.length > 0 &&
        budgetName.length < 100 &&
        !budgetHeaders.some((header) => header.name === budgetName);

    const handleBudgetNameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setBudgetName(event.target.value);
    };

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleTest = () => {
        console.log(selectedFile);
        if (selectedFile) {
            JSZip.loadAsync(selectedFile).then((zip) => {
                zip.forEach((relPath, entry) => {
                    console.log(entry.name);
                    entry.async("string").then(
                        (content) => {
                            console.log(content);
                            if (entry.name.includes("Budget")) {
                                parseYNABBudgetFileStringAsync(content).then(
                                    (records) => {
                                        console.log(records);
                                    },
                                    (e) => {
                                        console.error(e);
                                    },
                                );
                            } else if (entry.name.includes("Register")) {
                                parseYNABTransactionsFileStringAsync(
                                    content,
                                ).then(
                                    (records) => {
                                        console.log(records);
                                    },
                                    (e) => {
                                        console.error(e);
                                    },
                                );
                            }
                        },
                        (e) => {
                            console.error(e);
                        },
                    );
                });
                // console.log(zip.files);
            });
        }
    };

    const handleInternalClose = () => {
        setBudgetName("");
        handleClose();
    };

    const handleAddBudget = () => {
        // console.log(`Adding budget ${budgetName}`);
        const budgetID = uuid();
        dispatch(
            addBudgetHeader({
                id: budgetID,
                name: budgetName,
            }),
        );
        navigate(`/${budgetID}`);
        handleInternalClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleInternalClose}>
            <DialogTitle>Import Budget From a File</DialogTitle>
            <DialogContent>
                <Input
                    type="file"
                    onChange={handleFileInputChange}
                    // sx={{ display: "none" }}
                />
                {/* <InputLabel htmlFor="import-budget-file-button">
                    Weesnaw
                </InputLabel> */}
                {/* <TextField
                    fullWidth
                    margin="dense"
                    label="Name"
                    value={budgetName}
                    onChange={handleBudgetNameChange}
                    sx={{ textAlign: "left" }}
                /> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleTest}>Test</Button>
                <Button onClick={handleInternalClose}>Cancel</Button>
                <Button disabled={!isValid} onClick={handleAddBudget}>
                    Import Budget
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportBudgetDialog;
