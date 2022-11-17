import { Box, SxProps, Typography } from "@mui/material";

import AccountRow from "components/AccountRow";
import { useAccounts } from "data/Hooks";
import { Account } from "models/Budget";

const Item = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: SxProps;
}) => {
    return <Box sx={{ m: 0, ...sx }}>{children}</Box>;
};

const GroupLabelItem = ({ label }: { label: string }) => (
    <Box
        sx={{
            my: 2,
            width: 1,
            display: "flex",
            justifyContent: "space-evenly",
        }}
    >
        <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
    </Box>
);

const AccountRowMapFunc = (account: Account) => (
    <Item key={account.id}>
        <AccountRow account={account} />
    </Item>
);

const AccountList: React.FC = () => {
    const accounts = useAccounts();

    const onBudgetAccounts = accounts.filter((a) => !a.isOffBudget);
    const offBudgetAccounts = accounts.filter((a) => a.isOffBudget);

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {onBudgetAccounts.length > 0 && (
                <GroupLabelItem label="On Budget" />
            )}
            {onBudgetAccounts.map(AccountRowMapFunc)}
            {offBudgetAccounts.length > 0 && (
                <GroupLabelItem label="Off Budget" />
            )}
            {offBudgetAccounts.map(AccountRowMapFunc)}
        </Box>
    );
};

export default AccountList;
