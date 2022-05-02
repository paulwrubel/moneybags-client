import { Button, Stack } from "@mui/material";

import { Link } from "react-router-dom";

const ViewsList: React.FC = () => {
    return (
        <>
            <Stack direction="column">
                <Button
                    to="../allocations"
                    component={Link}
                    sx={{ color: "black" }}
                >
                    Allocations
                </Button>
                <Button
                    to="../insights"
                    component={Link}
                    sx={{ color: "black" }}
                >
                    Insights
                </Button>
                <Button
                    to="../accounts"
                    component={Link}
                    sx={{ color: "black" }}
                >
                    Accounts
                </Button>
            </Stack>
        </>
    );
};

export default ViewsList;
