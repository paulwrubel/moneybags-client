import { Button, Stack } from "@mui/material";

const ViewsList: React.FC = () => {
    // const accountIDs = useAppSelector((state) =>
    //     (state.budget.accounts ?? []).map((account) => account.id),
    // );

    return (
        <>
            <Stack direction="column">
                <Button sx={{ color: "black" }}>Allocations</Button>
                <Button sx={{ color: "black" }}>Insights</Button>
                <Button sx={{ color: "black" }}>Accounts</Button>
            </Stack>
        </>
    );
};

export default ViewsList;
