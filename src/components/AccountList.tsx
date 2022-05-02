import AccountRow from "components/AccountRow";
import { useAccountIDs } from "data/Hooks";

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
