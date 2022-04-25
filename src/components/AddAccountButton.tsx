import { Button } from "@mui/material";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";

const AddAccountButton: React.FC<{
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
            size="small"
            startIcon={<AddCircleOutlineSharpIcon />}
            sx={{ textTransform: "none", color: "black" }}
        >
            Add an account
        </Button>
    );
};

export default AddAccountButton;
