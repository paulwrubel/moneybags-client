/* eslint-disable sonarjs/no-duplicate-string */
import dayjs from "dayjs";

import { Budget } from "models/Budget";

const TestBudgetData: Budget = {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    name: "Test",
    createdAt: dayjs().valueOf(),
    modifiedAt: dayjs().valueOf(),
    accessedAt: dayjs().valueOf(),
    categoryGroups: [
        {
            id: "ecfba38a-b180-42d2-b3d2-f5ebd09a2586",
            name: "Personal",
            sort: 0,
        },
        {
            id: "15ea8126-0ac8-4ec0-a7f4-e4571b0bb632",
            name: "Business",
            sort: 1,
        },
    ],
    categories: [
        {
            id: "64dee181-dec6-4cff-a0e7-383d02c320fb",
            groupID: "ecfba38a-b180-42d2-b3d2-f5ebd09a2586",
            name: "Cash",
            sort: 0,
            previousBalance: 0,
            allocated: 0,
            activity: 0,
        },
        {
            id: "20d3e464-253e-4e30-a867-0d844b0cc051",
            groupID: "ecfba38a-b180-42d2-b3d2-f5ebd09a2586",
            name: "Credit Card",
            sort: 1,
            previousBalance: 0,
            allocated: 0,
            activity: 0,
        },
        {
            id: "6a433025-024e-4fca-a3f9-0a47b2bed180",
            groupID: "15ea8126-0ac8-4ec0-a7f4-e4571b0bb632",
            name: "Expenses",
            sort: 0,
            previousBalance: 0,
            allocated: 0,
            activity: 0,
        },
        {
            id: "f18973aa-7805-4bc9-be9a-8ec71f595eb8",
            groupID: "15ea8126-0ac8-4ec0-a7f4-e4571b0bb632",
            name: "Materials",
            sort: 1,
            previousBalance: 0,
            allocated: 0,
            activity: 0,
        },
    ],
    // accounts: [
    //     {
    //         id: "ed897443-3e26-4fdf-a293-0bd2ce10502d",
    //         name: "Test",
    //     },
    // ],
    // transactions: [
    //     {
    //         id: "8ca1f91f-e9fd-4f32-841e-5e17dba3252f",
    //         accountID: "ed897443-3e26-4fdf-a293-0bd2ce10502d",
    //         categoryID: "0",
    //         date: dayjs().valueOf(),
    //         amount: 500,
    //     },
    // ],
};

// const saveTestBudgetDataToLocalStorage = () => {
//     if (localStorage.getItem(TestBudgetData.id) === null) {
//         const testBudgetDataString = JSON.stringify(TestBudgetData);
//         // console.log(testBudgetDataString);
//         try {
//             localStorage.setItem(TestBudgetData.id, testBudgetDataString);
//             const pullData = localStorage.getItem(TestBudgetData.id);
//             // console.log(pullData);
//         } catch (error) {
//             console.error(error);
//         }
//     }
// };
//
// const addTestBudgetDataToBudgetHeaders = () => {
//     const headersString = localStorage.getItem("budgetHeaders");
//     const headers: BudgetHeader[] = headersString
//         ? JSON.parse(headersString)
//         : [];
//     const index = headers.findIndex(
//         (header) => header.id === TestBudgetData.id,
//     );
//     const header: BudgetHeader = {
//         id: TestBudgetData.id,
//         name: TestBudgetData.name,
//         createdAt: TestBudgetData.createdAt,
//         modifiedAt: TestBudgetData.modifiedAt,
//         accessedAt: TestBudgetData.accessedAt,
//     };
//     index === -1 ? headers.push(header) : (headers[index] = header);
//     localStorage.setItem("budgetHeaders", JSON.stringify(headers));
// };

// saveTestBudgetDataToLocalStorage();
// addTestBudgetDataToBudgetHeaders();

export { TestBudgetData };
