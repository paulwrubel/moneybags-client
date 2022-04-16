import { Typography } from "@mui/material";

const Loading: React.FC<{ reason: string }> = ({ reason }) => {
    return (
        <>
            <Typography variant="h2">Loading</Typography>
            <Typography variant="body1">{reason}</Typography>
        </>
    );
};

export default Loading;
