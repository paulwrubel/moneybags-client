import Budget from "models/Budget";

export const TestBudgetData: Budget = {
    name: "Test Budget",
    categoryGroups: [
        {
            id: "1",
            name: "Personal",
            categories: [
                {
                    id: "1",
                    name: "Cash",
                    previousBalance: 0,
                    allocated: 100,
                    activity: 0,
                },
                {
                    id: "2",
                    name: "Credit Card",
                    previousBalance: 0,
                    allocated: 200,
                    activity: 0,
                },
            ],
        },
        {
            id: "2",
            name: "Business",
            categories: [
                {
                    id: "1",
                    name: "Expenses",
                    previousBalance: 0,
                    allocated: 300,
                    activity: 0,
                },
                {
                    id: "2",

                    name: "Materials",
                    previousBalance: 0,
                    allocated: 400,
                    activity: 0,
                },
            ],
        },
    ],
};
