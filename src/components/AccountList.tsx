import { Box, SxProps } from "@mui/material";

import AccountRow from "components/AccountRow";
import { useAccountIDs } from "data/Hooks";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return <Box sx={{ m: 0, ...sx }}>{children}</Box>;
};

const AccountList: React.FC = () => {
    const accountIDs = useAccountIDs();

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {accountIDs.map((id) => (
                <Item key={id}>
                    <AccountRow id={id} />
                </Item>
            ))}
        </Box>
    );
};

export default AccountList;
