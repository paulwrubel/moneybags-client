import { useAccountIDs } from "data/Hooks";

import AccountRow from "./AccountRow";

const AccountList: React.FC = () => {
    const accountIDs = useAccountIDs();

    return (
        <>
            {accountIDs.map((id) => (
                <AccountRow key={id} id={id} />
            ))}
        </>
    );
};

export default AccountList;
