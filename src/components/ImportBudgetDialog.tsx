import { ChangeEvent, useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Input,
    InputLabel,
    TextField,
    Typography,
} from "@mui/material";

import dayjs from "dayjs";
import JSZip from "jszip";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { setBudget } from "data/BudgetSlice";
import { saveLock, saveUnlock, setActiveBudgetID } from "data/CoreSlice";
import { useAppDispatch, useBudgetHeaders } from "data/Hooks";
import { addBudgetHeader } from "data/MetadataSlice";
import { Budget } from "models/Budget";
import {
    createBudgetFromYNABData,
    parseYNABBudgetFileStringAsync,
    parseYNABTransactionsFileStringAsync,
    parseYNABZipFile,
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
    const [isImporting, setIsImporting] = useState(false);
    const [importedBudget, setImportedBudget] = useState<Budget | null>(null);
    const dispatch = useAppDispatch();
    const budgetHeaders = useBudgetHeaders();

    useEffect(() => {
        if (importedBudget) {
            setIsImporting(false);
            console.log(importedBudget);

            dispatch(saveLock());
            dispatch(
                addBudgetHeader({
                    id: importedBudget.id,
                    name: importedBudget.name,
                }),
            );
            dispatch(setBudget(importedBudget));
            dispatch(setActiveBudgetID(importedBudget.id));
            dispatch(saveUnlock());
            navigate(`/${importedBudget.id}`);
            handleInternalClose();
        }
    }, [importedBudget]);

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

    const handleInternalClose = () => {
        setBudgetName("");
        handleClose();
    };

    const handleAddBudget = () => {
        const id = uuid();
        const currentTime = dayjs().valueOf();
        const header = {
            id: id,
            name: budgetName,
            createdAt: currentTime,
            modifiedAt: currentTime,
            accessedAt: currentTime,
        };
        if (selectedFile) {
            setIsImporting(true);
            parseYNABZipFile(selectedFile)
                .then(({ budgetRecords, transactionsRecords }) => {
                    const budget = createBudgetFromYNABData(
                        header,
                        budgetRecords,
                        transactionsRecords,
                    );
                    setImportedBudget(budget);
                    // console.log(budget);
                })
                .catch((e) => {
                    console.error(e);
                });
        }
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
                <TextField
                    fullWidth
                    margin="dense"
                    label="Budget Name"
                    value={budgetName}
                    onChange={handleBudgetNameChange}
                    sx={{ textAlign: "left" }}
                />
                {isImporting && <Typography>IMPORTING BUDGET</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleInternalClose}>Cancel</Button>
                <Button disabled={!isValid} onClick={handleAddBudget}>
                    Import Budget
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportBudgetDialog;
