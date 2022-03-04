import { useProtectedAPI } from "auth/AuthContext";
import { HTTPError } from "ky";
import { KyInstance } from "ky/distribution/types/ky";
import ErrorResponse from "models/ErrorResponse";
import UserAccount from "models/UserAccount";
import { useState, useEffect } from "react";

export function useUserAccount(): UserAccount | ErrorResponse | null {
    const api = useProtectedAPI() as KyInstance;
    // return api.get("user-accounts").json<UserAccount>();
    const [userAccount, setUserAccount] = useState<
        UserAccount | ErrorResponse | null
    >(null);

    useEffect(() => {
        let isMounted = true;
        api.get("user-accounts")
            .json<UserAccount>()
            .then((userAccount) => {
                if (isMounted) {
                    setUserAccount(userAccount);
                }
                // setUserAccount(userAccount);
            })
            .catch((err: HTTPError) => {
                // return err.response.json();
                // /*

                err.response.json().then((errorResponse: ErrorResponse) => {
                    // setAccessToken(null);
                    // console.error(
                    //     errorResponse.errors.map((e) => e.message).join("\n"),
                    // );
                    if (isMounted) {
                        setUserAccount(errorResponse);
                    }
                    // setUserAccount(errorResponse);
                });
                // throw err;

                // */
                // setUsername("__ERROR__");
                // console.error(err);
            })
            .catch((err) => {
                if (isMounted) {
                    setUserAccount(null);
                }
                // setUserAccount(null);
                console.error(err);
            });
        return () => (isMounted = false);
    });

    return userAccount;
}
