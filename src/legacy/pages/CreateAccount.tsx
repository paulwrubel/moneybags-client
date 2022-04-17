import { useState } from "react";
// import { Button, TextField, Typography } from "@mui/material";
// // import { useAPI } from "api/APIContext";
// import UserAccount from "models/UserAccount";
// import ErrorResponse from "models/ErrorResponse";
// import { HTTPError } from "ky";
// import { KyInstance } from "ky/distribution/types/ky";
// import { Link } from "react-router-dom";
// import { postUserAccount } from "api/API";
//
// const CreateAccount: React.FC = () => {
//     // const api = useAPI() as KyInstance;
//
//     const [username, setUsername] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const [confirmPassword, setConfirmPassword] = useState<string>("");
//     const [email, setEmail] = useState<string>("");
//
//     const [errorMessage, setErrorMessage] = useState<string>("");
//     const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
//
//     const passwordIsValid = password.length >= 12;
//     const confirmPasswordIsValid = password === confirmPassword;
//
//     const isValid =
//         passwordIsValid && confirmPasswordIsValid && username.length > 0;
//
//     return (
//         <>
//             <Typography variant="h2">Create an account</Typography>
//             <Typography variant="body1" color="error">
//                 {errorMessage}
//             </Typography>
//             <TextField
//                 required
//                 label="Username"
//                 value={username}
//                 onChange={(e) => {
//                     setUsername(e.target.value);
//                 }}
//             />
//             <TextField
//                 required
//                 label="Password"
//                 type="password"
//                 value={password}
//                 error={password.length > 0 && !passwordIsValid}
//                 helperText={
//                     password.length > 0 && !passwordIsValid
//                         ? "Too short."
//                         : undefined
//                 }
//                 onChange={(e) => {
//                     setPassword(e.target.value);
//                 }}
//             />
//             <TextField
//                 required
//                 label="Confirm password"
//                 type="password"
//                 value={confirmPassword}
//                 error={!confirmPasswordIsValid}
//                 helperText={
//                     !confirmPasswordIsValid
//                         ? "Passwords do not match."
//                         : undefined
//                 }
//                 onChange={(e) => {
//                     setConfirmPassword(e.target.value);
//                 }}
//             />
//             <TextField
//                 label="Email"
//                 value={email}
//                 onChange={(e) => {
//                     setEmail(e.target.value);
//                 }}
//             />
//             <Button
//                 variant="text"
//                 disabled={!isValid}
//                 onClick={() => {
//                     postUserAccount(
//                         username,
//                         password,
//                         email ? email : undefined,
//                     )
//                         .then((userAccount) => {
//                             setErrorMessage("");
//                             setIsSuccessful(true);
//                             console.log(userAccount.id);
//                         })
//                         .catch((err: HTTPError) => {
//                             console.error(err);
//                             err.response
//                                 .json()
//                                 .then(({ errors }: ErrorResponse) => {
//                                     setErrorMessage(
//                                         errors.map((e) => e.message).join("\n"),
//                                     );
//                                 });
//                         })
//                         .catch((err) => {
//                             console.error(err);
//                         });
//                 }}
//             >
//                 Submit
//             </Button>
//             {isSuccessful && (
//                 <>
//                     <Typography variant="body1">
//                         Success! Now navigate to{" "}
//                         <Link to="../login">the Login page</Link> to log in!
//                     </Typography>
//                 </>
//             )}
//         </>
//     );
// };
//
// export default CreateAccount;
