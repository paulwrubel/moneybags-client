import { Typography } from "@mui/material";
import { useState } from "react";
import EnvelopeStack from "./EnvelopeStack";

const envelopeStacks = [
    {
        id: "1",
        name: "Personal",
        envelopes: [
            {
                id: "1",
                name: "Cash",
                amount: 100,
            },
            {
                id: "2",
                name: "Credit Card",
                amount: 200,
            },
        ],
    },
    {
        id: "2",
        name: "Business",
        envelopes: [
            {
                id: "1",
                name: "Expenses",
                amount: 300,
            },
            {
                id: "2",

                name: "Materials",
                amount: 400,
            },
        ],
    },
];

const EnvelopeStackList: React.FC = () => {
    return (
        <>
            {envelopeStacks.map((envelopeStack) => (
                <EnvelopeStack
                    key={envelopeStack.id}
                    envelopeStack={envelopeStack}
                />
            ))}
        </>
    );
};

export default EnvelopeStackList;
