import Moneybags from "Moneybags";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./misc/reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <Moneybags />
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
