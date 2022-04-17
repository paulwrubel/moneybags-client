// // import { useProtectedAPI } from "auth/AuthContext";
// import ky from "ky";
// import { KyInstance } from "ky/distribution/types/ky";
// // import ErrorResponse from "models/ErrorResponse";
// import UserAccount from "models/UserAccount";
// import Token from "models/Token";
// import { createContext, useContext } from "react";
// import { useAuth } from "auth/AuthProvider";
import { useState, useEffect } from "react";
//
// // APIContext
//
// interface ProtectedAPIContext {
//     postRefreshToken: () => Promise<Token>;
//     getUserAccount: () => Promise<UserAccount>;
// }
//
// const api: KyInstance = ky.extend({
//     prefixUrl: "/api/v1",
// });
//
// // const APIContext = createContext<KyInstance | undefined>(undefined);
// const ProtectedAPI = createContext<ProtectedAPIContext | undefined>(undefined);
//
// export const useProtectedAPI: () => ProtectedAPIContext = () => {
//     const api = useContext(ProtectedAPI);
//     if (!api) {
//         throw new Error("useAPI must be used within a ProtectedAPIProvider");
//     }
//     return api;
// };
//
// // APIProvider
//
// export const ProtectedAPIProvider: React.FC<{ children: React.ReactNode }> = ({
//     children,
// }) => {
//     const auth = useAuth();
//
//     const protectedAPI: KyInstance = api.extend({
//         hooks: {
//             beforeRequest: [
//                 (request) => {
//                     request.headers.set(
//                         "Authorization",
//                         `Bearer ${auth.accessToken}`,
//                     );
//                 },
//             ],
//             beforeError: [
//                 (error) => {
//                     if (error?.response?.status === 401) {
//                         auth.setNewAccessToken(null);
//                     }
//                     return error;
//                 },
//             ],
//         },
//     });
//
//     const postRefreshToken: () => Promise<Token> = () =>
//         protectedAPI.post("auth/refresh-token").json<Token>();
//
//     const getUserAccount: () => Promise<UserAccount> = () => {
//         // console.log("In API call getUserAccount(): " + accessToken);
//         return protectedAPI.get("user-accounts").json<UserAccount>();
//     };
//
//     return (
//         <ProtectedAPI.Provider value={{ getUserAccount, postRefreshToken }}>
//             {children}
//         </ProtectedAPI.Provider>
//     );
// };
//
// // API Functions
//
// // export const getUserAccount: (auth: Auth) => Promise<UserAccount> = (
// //     accessToken,
// // ) => {
// //     console.log("In API call getUserAccount(): " + accessToken);
// //     return api
// //         .get("user-accounts", {
// //             headers: { Authorization: `Bearer ${accessToken}` },
// //         })
// //         .json<UserAccount>();
// // };
//
// export const postUserAccount: (
//     username: string,
//     password: string,
//     email?: string,
// ) => Promise<UserAccount> = (username, password, email) =>
//     api
//         .post("user-accounts", {
//             json: { username: username, password: password, email: email },
//         })
//         .json<UserAccount>();
//
// // export const postRefreshToken: (accessToken: string) => Promise<Token> = (
// //     accessToken,
// // ) =>
// //     api
// //         .post("auth/refresh-token", {
// //             headers: { Authorization: `Bearer ${accessToken}` },
// //         })
// //         .json<Token>();
//
// export const postLogin: (
//     username: string,
//     password: string,
// ) => Promise<Token> = (username, password) =>
//     api
//         .post("auth/login", {
//             json: { username, password },
//             credentials: "include",
//         })
//         .json<Token>();
