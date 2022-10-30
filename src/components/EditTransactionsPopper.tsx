import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Paper } from "@mui/material";

import SolidPopper from "components/SolidPopper";
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
}: {
    selectedTransactions: Transaction[];
    setSelectedTransactions: (arg0: Transaction[]) => void;
    isOpen: boolean;
    anchorEl: Element | null;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
}) => {
    const dispatch = useAppDispatch();

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
                        <Button
                            variant="outlined"
                            onClick={handleDeleteButtonClick}
                            size="small"
                            startIcon={<DeleteIcon />}
                            sx={{
                                color: "black",
                                borderColor: "black",
                            }}
                        >
                            Delete ({selectedTransactions.length})
                        </Button>
                    </Item>
                    <Item>
                        <Button
                            variant="outlined"
                            onClick={handleDuplicateButtonClick}
                            size="small"
                            startIcon={<ContentCopyIcon />}
                            sx={{
                                color: "black",
                                borderColor: "black",
                            }}
                        >
                            Duplicate ({selectedTransactions.length})
                        </Button>
                    </Item>
                </Box>
            </Paper>
        </SolidPopper>
    );
};

export default EditTransactionsPopper;
