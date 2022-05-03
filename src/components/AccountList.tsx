import { Box } from "@mui/material";

import AccountRow from "components/AccountRow";
import { useAccountIDs } from "data/Hooks";

const AccountList: React.FC = () => {
    const accountIDs = useAccountIDs();

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {accountIDs.map((id) => (
                <AccountRow key={id} id={id} />
            ))}
        </Box>
    );
};

export default AccountList;
